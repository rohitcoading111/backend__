import userModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.utils.js";
import imagekit from "../config/imagekit.js";
import { startLoginOTP } from "./loginOTP.services.js";
import PendingLogin from "../models/pendingLogin.models.js";
import { verifyMobileOTP } from "./otp.services.js";
import PendingRegistration from "../models/pendingRegistration.models.js";
import { sendLoginNotification } from "./loginNotification.services.js";
import {
  generateEmailOTP,
  sendEmailOTP,
} from "./emailOTP.services.js";
import crypto from "node:crypto";
import { startEmailLoginOTP } from "./emailLoginOTP.services.js";
import {sendMobileLoginNotification,} from "./loginNotification.services.js";
import { sendMobileOTP,} from "./otp.services.js";
import PasswordReset from "../models/passwordReset.models.js";

// otp values 
const OTP_RESEND_COOLDOWN_MS = 60 * 1000;
const OTP_SEND_WINDOW_MS = 60 * 60 * 1000;
const MAX_OTP_SENDS_PER_WINDOW = 5;
const RESET_OTP_TTL_MS = 10 * 60 * 1000;

// Temporary reset OTP records will be stored separately.



export const uploadAvatar = async (file) => {
  if (!file) {
    return {
      url: null,
      fileId: null,
    };
  }

  const uploadResponse = await imagekit.files.upload({
    file: file.buffer.toString("base64"),
    fileName: `${Date.now()}-${file.originalname}`,
    folder: "/lms/avatars",
  });

  return {
    url: uploadResponse.url,
    fileId: uploadResponse.fileId,
  };
};


export const registerUser = async (user) => {
  const { email, mobile, password, name, file } = user;

  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedMobile = mobile?.trim() || undefined;

  // This service handles email registration.
  if (!normalizedEmail) {
    throw new Error("Email is required for email registration");
  }

  // Reject an already registered email.
  const existingUser = await userModel.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    throw new Error("Email or mobile number already exists");
  }

  // Reject an email that already has a pending registration.
  const existingPending = await PendingRegistration.findOne({
    email: normalizedEmail,
  });

  if (existingPending) {
    throw new Error(
      "Registration already pending for this email. Resend OTP flow is not implemented yet."
    );
  }

  // Hash the password before temporarily storing it.
  const hashedPassword = await bcrypt.hash(password, 10);

  // Upload avatar if supplied.
  const avatarData = await uploadAvatar(file);

  // Generate a secure six-digit email OTP.
  const otp = generateEmailOTP();
  const emailOtpHash = crypto
    .createHash("sha256")
    .update(otp)
    .digest("hex");

  // Store temporary registration details.
  const pending = await PendingRegistration.create({
    name,
    email: normalizedEmail,
    mobile: normalizedMobile,
    password: hashedPassword,
    avatar: avatarData,
    emailOtpHash,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    otpWindowStartedAt: new Date(),
    otpSendCount: 1,
    lastOtpSentAt: new Date(),
  });

  try {
    await sendEmailOTP(normalizedEmail, otp);
  } catch (error) {
    // Clean up if the email could not be sent.
    await PendingRegistration.deleteOne({ _id: pending._id });
    throw new Error("EMAIL_OTP_SEND_FAILED");
  }

  return {
    message: "Verification OTP sent to your email",
    email: normalizedEmail,
    otpRequired: true,
  };
};


export const LoginUser = async (user) => {
  const { email, mobile, password } = user;

  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedMobile = mobile?.trim();

  if (!normalizedEmail && !normalizedMobile) {
    throw new Error("Email or mobile number is required");
  }

  
const existingUser = await userModel
  .findOne({
    $or: [
      ...(normalizedEmail ? [{ email: normalizedEmail }] : []),
      ...(normalizedMobile ? [{ mobile: normalizedMobile }] : []),
    ],
  })
  .select("+password");


if (!password || !existingUser.password) {
  throw new Error("Invalid email or password");
}

const isPasswordValid = await bcrypt.compare(
  password,
  existingUser.password
);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // MOBILE LOGIN: Existing Twilio OTP flow
  if (normalizedMobile) {
    if (!existingUser.mobile) {
      throw new Error("LOGIN_MOBILE_REQUIRED");
    }

    await startLoginOTP(existingUser);

    return {
      message: "Password verified. OTP sent to registered mobile.",
      mobile: existingUser.mobile,
    };
  }

  // EMAIL LOGIN: Nodemailer flow will be implemented next
 // EMAIL LOGIN
if (normalizedEmail) {
  if (!existingUser.email) {
    throw new Error("LOGIN_EMAIL_REQUIRED");
  }

  return await startEmailLoginOTP(existingUser);
}
};


export const verifyEmailLoginOTP = async ({ email, code }) => {
  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedCode = String(code ?? "").trim();

  if (!normalizedEmail || !/^\d{6}$/.test(normalizedCode)) {
    throw new Error("Email and a valid 6-digit OTP are required");
  }

  const pendingLogin = await PendingLogin.findOne({
    email: normalizedEmail,
  }).select("+otpHash");

  if (!pendingLogin) {
    throw new Error("LOGIN_SESSION_NOT_FOUND");
  }

  if (pendingLogin.expiresAt <= new Date()) {
    await PendingLogin.deleteOne({ _id: pendingLogin._id });
    throw new Error("LOGIN_SESSION_EXPIRED");
  }

  if (!pendingLogin.otpHash) {
    throw new Error("INVALID_LOGIN_OTP");
  }

  // Maximum 5 incorrect attempts
  if (pendingLogin.otpAttempts >= 5) {
    await PendingLogin.deleteOne({ _id: pendingLogin._id });
    throw new Error("OTP_ATTEMPTS_EXCEEDED");
  }

  const submittedHash = crypto
    .createHash("sha256")
    .update(normalizedCode)
    .digest("hex");

  const isOTPValid =
    submittedHash.length === pendingLogin.otpHash.length &&
    crypto.timingSafeEqual(
      Buffer.from(submittedHash, "hex"),
      Buffer.from(pendingLogin.otpHash, "hex")
    );

  if (!isOTPValid) {
    pendingLogin.otpAttempts += 1;
    await pendingLogin.save();
    throw new Error("INVALID_LOGIN_OTP");
  }

  const existingUser = await userModel.findById(pendingLogin.userId);

  if (!existingUser || existingUser.email?.toLowerCase() !== normalizedEmail) {
    await PendingLogin.deleteOne({ _id: pendingLogin._id });
    throw new Error("LOGIN_SESSION_NOT_FOUND");
  }

  const accessToken = generateAccessToken(existingUser);
  const refreshToken = generateRefreshToken(existingUser);

  existingUser.refreshToken = refreshToken;
  await existingUser.save();
  await sendLoginNotification({
  email: existingUser.email,
  name: existingUser.name,
  loginMethod: "EMAIL OTP",
});

  await PendingLogin.deleteOne({ _id: pendingLogin._id });

  return {
    accessToken,
    refreshToken,
    user: {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      mobile: existingUser.mobile,
      role: existingUser.role,
      mobileVerified: existingUser.mobileVerified,
    },
  };
};


export const verifyLoginOTP = async ({ mobile, code }) => {
  const normalizedMobile = mobile?.trim();
  const normalizedCode = String(code ?? "").trim();

  if (!normalizedMobile || !normalizedCode) {
    throw new Error("Mobile and OTP are required");
  }

  const pendingLogin = await PendingLogin.findOne({
    mobile: normalizedMobile,
  });

  if (!pendingLogin) {
    throw new Error("LOGIN_SESSION_NOT_FOUND");
  }

  if (pendingLogin.expiresAt <= new Date()) {
    await PendingLogin.deleteOne({ _id: pendingLogin._id });
    throw new Error("LOGIN_SESSION_EXPIRED");
  }

  const existingUser = await userModel.findById(
    pendingLogin.userId
  );

  if (!existingUser || existingUser.mobile !== normalizedMobile) {
    await PendingLogin.deleteOne({ _id: pendingLogin._id });
    throw new Error("LOGIN_SESSION_NOT_FOUND");
  }

  const isOTPValid = await verifyMobileOTP(
    normalizedMobile,
    normalizedCode
  );

  if (!isOTPValid) {
    throw new Error("INVALID_LOGIN_OTP");
  }

  // OTP verified: ab tokens generate honge.
  existingUser.mobileVerified = true;

  const accessToken = generateAccessToken(existingUser);
  const refreshToken = generateRefreshToken(existingUser);

  existingUser.refreshToken = refreshToken;
  await existingUser.save();


  await sendMobileLoginNotification({
  mobile: existingUser.mobile,
  name: existingUser.name,
  });

  await PendingLogin.deleteOne({ _id: pendingLogin._id });

  return {
    accessToken,
    refreshToken,
    user: {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      mobile: existingUser.mobile,
      role: existingUser.role,
      mobileVerified: existingUser.mobileVerified,
    },
  };
};


export const refreshTokenService = async (decoded, refreshToken) => {
  const { id, email } = decoded;

  const existingUser = await userModel.findById(id);

  if (!existingUser || existingUser.email !== email) {
    throw new Error("Invalid refresh token");
  }

  if (existingUser.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const accessToken = generateAccessToken(existingUser);

  return accessToken;
};

export const LogoutUser = async (refreshToken) => {

  const loggedOutUser = await userModel.findOneAndUpdate(
    { refreshToken: refreshToken },
    { $set: { refreshToken: null } },
    { new: true }
  );

  return loggedOutUser;
};

export const startPasswordReset = async ({ identifier }) => {
  const normalizedIdentifier = identifier.trim();
  const isEmail = normalizedIdentifier.includes("@");

  const user = await userModel.findOne(
    isEmail
      ? { email: normalizedIdentifier.toLowerCase() }
      : { mobile: normalizedIdentifier }
  );

  // Do not reveal whether the account exists.
  if (!user) {
    return {
      message:
        "If an account exists, a password reset OTP will be sent.",
    };
  }

  const now = new Date();

  let resetRecord = await PasswordReset.findOne({
    userId: user._id,
  });

  if (resetRecord && resetRecord.expiresAt <= now) {
    await PasswordReset.deleteOne({ _id: resetRecord._id });
    resetRecord = null;
  }

  if (resetRecord) {
    const lastSentAt = resetRecord.lastOtpSentAt?.getTime() ?? 0;

    if (now.getTime() - lastSentAt < OTP_RESEND_COOLDOWN_MS) {
      throw new Error("OTP_COOLDOWN");
    }

    const windowStartedAt =
      resetRecord.otpWindowStartedAt?.getTime() ?? 0;

    const windowExpired =
      now.getTime() - windowStartedAt >= OTP_SEND_WINDOW_MS;

    if (
      !windowExpired &&
      resetRecord.otpSendCount >= MAX_OTP_SENDS_PER_WINDOW
    ) {
      throw new Error("OTP_RATE_LIMIT");
    }
  }

  let otpHash;

  if (isEmail) {
    if (!user.email) {
      return {
        message:
          "If an account exists, a password reset OTP will be sent.",
      };
    }

    const otp = generateEmailOTP();
    otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    await sendEmailOTP(user.email, otp);
  } else {
    if (!user.mobile) {
      return {
        message:
          "If an account exists, a password reset OTP will be sent.",
      };
    }

    await sendMobileOTP(user.mobile);
  }

  if (!resetRecord) {
    resetRecord = new PasswordReset({
      userId: user._id,
      email: isEmail ? user.email : undefined,
      mobile: !isEmail ? user.mobile : undefined,
      otpHash,
      otpAttempts: 0,
      expiresAt: new Date(now.getTime() + RESET_OTP_TTL_MS),
      otpWindowStartedAt: now,
      otpSendCount: 1,
      lastOtpSentAt: now,
    });
  } else {
    const windowExpired =
      now.getTime() -
        (resetRecord.otpWindowStartedAt?.getTime() ?? 0) >=
      OTP_SEND_WINDOW_MS;

    if (windowExpired) {
      resetRecord.otpWindowStartedAt = now;
      resetRecord.otpSendCount = 1;
    } else {
      resetRecord.otpSendCount += 1;
    }

    resetRecord.email = isEmail ? user.email : undefined;
    resetRecord.mobile = !isEmail ? user.mobile : undefined;
    resetRecord.otpHash = otpHash;
    resetRecord.otpAttempts = 0;
    resetRecord.expiresAt = new Date(now.getTime() + RESET_OTP_TTL_MS);
    resetRecord.lastOtpSentAt = now;
  }

  await resetRecord.save();

  return {
    message:
      "If an account exists, a password reset OTP will be sent.",
  };
};
