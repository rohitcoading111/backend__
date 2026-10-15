import bcrypt from "bcryptjs";

import userModel from "../models/user.models.js";
import PendingRegistration from "../models/pendingRegistration.models.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth.utils.js";
import { uploadAvatar } from "./auth.services.js";
import {
  sendMobileOTP,
  verifyMobileOTP,
} from "./otp.services.js";

const OTP_RESEND_COOLDOWN_MS = 60 * 1000;
const OTP_SEND_WINDOW_MS = 60 * 60 * 1000;
const MAX_OTP_SENDS_PER_WINDOW = 5;
const PENDING_REGISTRATION_TTL_MS = 10 * 60 * 1000;

const normalizeEmail = (email) =>
  email?.trim().toLowerCase() || undefined;

const throwDuplicateRegistrationError = (error) => {
  if (error?.code === 11000) {
    throw new Error("Email or mobile number already exists");
  }

  throw error;
};

export const startMobileRegistration = async ({
  name,
  email,
  mobile,
  password,
  file,
}) => {
  const normalizedName = name?.trim();
  const normalizedEmail = normalizeEmail(email);
  const normalizedMobile = mobile?.trim();

  if (!normalizedName || !normalizedMobile || !password) {
    throw new Error("Name, mobile and password are required");
  }

  if (!/^\+[1-9]\d{7,14}$/.test(normalizedMobile)) {
    throw new Error(
      "Enter mobile number with country code, e.g. +919876543210"
    );
  }

  const identifiers = [
    { mobile: normalizedMobile },
    ...(normalizedEmail ? [{ email: normalizedEmail }] : []),
  ];

  const existingUser = await userModel.findOne({
    $or: identifiers,
  });

  if (existingUser) {
    throw new Error("Email or mobile number already exists");
  }

  const now = new Date();

  let pendingRegistration = await PendingRegistration.findOne({
    mobile: normalizedMobile,
  });

  if (pendingRegistration?.expiresAt <= now) {
    await PendingRegistration.deleteOne({
      _id: pendingRegistration._id,
    });
    pendingRegistration = null;
  }

  if (
    normalizedEmail &&
    (await PendingRegistration.exists({
      email: normalizedEmail,
      mobile: { $ne: normalizedMobile },
      expiresAt: { $gt: now },
    }))
  ) {
    throw new Error("Email or mobile number already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let avatarData = pendingRegistration?.avatar ?? {
    url: null,
    fileId: null,
  };

  if (file) {
    avatarData = await uploadAvatar(file);
  }

  if (!pendingRegistration) {
    try {
      pendingRegistration = await PendingRegistration.create({
        name: normalizedName,
        email: normalizedEmail,
        mobile: normalizedMobile,
        password: hashedPassword,
        avatar: avatarData,
        expiresAt: new Date(
          now.getTime() + PENDING_REGISTRATION_TTL_MS
        ),
        otpWindowStartedAt: now,
        otpSendCount: 0,
      });
    } catch (error) {
      throwDuplicateRegistrationError(error);
    }
  }

  await PendingRegistration.updateOne(
    {
      _id: pendingRegistration._id,
      $or: [
        { otpWindowStartedAt: { $exists: false } },
        {
          otpWindowStartedAt: {
            $lte: new Date(now.getTime() - OTP_SEND_WINDOW_MS),
          },
        },
      ],
    },
    {
      $set: {
        otpWindowStartedAt: now,
        otpSendCount: 0,
      },
    }
  );

  await PendingRegistration.updateOne(
    {
      _id: pendingRegistration._id,
      otpSendCount: { $exists: false },
    },
    {
      $set: { otpSendCount: 0 },
    }
  );

  const cooldownBoundary = new Date(
    now.getTime() - OTP_RESEND_COOLDOWN_MS
  );

  const reservedRegistration =
    await PendingRegistration.findOneAndUpdate(
      {
        _id: pendingRegistration._id,
        otpSendCount: { $lt: MAX_OTP_SENDS_PER_WINDOW },
        $or: [
          { lastOtpSentAt: { $exists: false } },
          { lastOtpSentAt: { $lte: cooldownBoundary } },
        ],
      },
      {
        $set: { lastOtpSentAt: now },
        $inc: { otpSendCount: 1 },
      },
      { returnDocument: "after" }
    );

  if (!reservedRegistration) {
    const currentRegistration =
      await PendingRegistration.findById(pendingRegistration._id);

    if (
      currentRegistration?.otpSendCount >=
      MAX_OTP_SENDS_PER_WINDOW
    ) {
      throw new Error(
        "OTP send limit reached. Please try again later"
      );
    }

    throw new Error("Please wait before requesting another OTP");
  }

  try {
    pendingRegistration.name = normalizedName;
    pendingRegistration.email = normalizedEmail;
    pendingRegistration.password = hashedPassword;
    pendingRegistration.avatar = avatarData;
    pendingRegistration.expiresAt = new Date(
      now.getTime() + PENDING_REGISTRATION_TTL_MS
    );

    await pendingRegistration.save();

    await sendMobileOTP(normalizedMobile);
  } catch (error) {
    throwDuplicateRegistrationError(error);
  }

  return {
    message: "OTP sent successfully",
    mobile: normalizedMobile,
  };
};

export const completeMobileRegistration = async ({
  mobile,
  code,
}) => {
  const normalizedMobile = mobile?.trim();
  const normalizedCode = String(code ?? "").trim();

  if (!normalizedMobile || !normalizedCode) {
    throw new Error("Mobile number and OTP are required");
  }

  const pendingUser = await PendingRegistration.findOne({
    mobile: normalizedMobile,
  });

  if (!pendingUser) {
    throw new Error("No pending registration found");
  }

  if (pendingUser.expiresAt <= new Date()) {
    await PendingRegistration.deleteOne({
      _id: pendingUser._id,
    });

    throw new Error("Registration expired. Please register again");
  }

  const isVerified = await verifyMobileOTP(
    normalizedMobile,
    normalizedCode
  );

  if (!isVerified) {
    throw new Error("Invalid or expired OTP");
  }

  const identifiers = [
    { mobile: normalizedMobile },
    ...(pendingUser.email ? [{ email: pendingUser.email }] : []),
  ];

  const existingUser = await userModel.findOne({
    $or: identifiers,
  });

  if (existingUser) {
    await PendingRegistration.deleteOne({
      _id: pendingUser._id,
    });

    throw new Error("Email or mobile number already exists");
  }

  let newUser;

  try {
    newUser = await userModel.create({
      name: pendingUser.name,
      email: pendingUser.email,
      mobile: pendingUser.mobile,
      password: pendingUser.password,
      avatar: pendingUser.avatar,
      mobileVerified: true,
    });
  } catch (error) {
    throwDuplicateRegistrationError(error);
  }

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  newUser.refreshToken = refreshToken;
  await newUser.save();

  await PendingRegistration.deleteOne({
    _id: pendingUser._id,
  });

  return {
    message: "Mobile verified and account created successfully",
    accessToken,
    refreshToken,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      mobile: newUser.mobile,
      mobileVerified: newUser.mobileVerified,
    },
  };
};
