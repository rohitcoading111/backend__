import crypto from "node:crypto";
import userModel from "../models/user.models.js";
import {
  generateEmailOTP,
  sendEmailOTP,
} from "./emailOTP.services.js";
import {
  sendMobileOTP,
} from "./otp.services.js";

const OTP_RESEND_COOLDOWN_MS = 60 * 1000;
const OTP_SEND_WINDOW_MS = 60 * 60 * 1000;
const MAX_OTP_SENDS_PER_WINDOW = 5;
const RESET_OTP_TTL_MS = 10 * 60 * 1000;

// Temporary reset OTP records will be stored separately.
import PasswordReset from "../models/passwordReset.models.js";

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
