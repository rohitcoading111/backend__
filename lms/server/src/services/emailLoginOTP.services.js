
import crypto from "node:crypto";
import PendingLogin from "../models/pendingLogin.models.js";
import { generateEmailOTP, sendEmailOTP } from "./emailOTP.services.js";

const OTP_RESEND_COOLDOWN_MS = 60 * 1000;
const OTP_SEND_WINDOW_MS = 60 * 60 * 1000;
const MAX_OTP_SENDS_PER_WINDOW = 5;
const PENDING_LOGIN_TTL_MS = 10 * 60 * 1000;

export const startEmailLoginOTP = async (user) => {
  const now = new Date();

  let pendingLogin = await PendingLogin.findOne({
    userId: user._id,
  });

  if (pendingLogin && pendingLogin.expiresAt <= now) {
    await PendingLogin.deleteOne({ _id: pendingLogin._id });
    pendingLogin = null;
  }

  if (pendingLogin) {
    const lastSentAt = pendingLogin.lastOtpSentAt?.getTime() ?? 0;

    if (now.getTime() - lastSentAt < OTP_RESEND_COOLDOWN_MS) {
      throw new Error("OTP_COOLDOWN");
    }

    const windowStartedAt =
      pendingLogin.otpWindowStartedAt?.getTime() ?? 0;

    const windowExpired =
      now.getTime() - windowStartedAt >= OTP_SEND_WINDOW_MS;

    if (!windowExpired && pendingLogin.otpSendCount >= MAX_OTP_SENDS_PER_WINDOW) {
      throw new Error("OTP_RATE_LIMIT");
    }
  }

  const otp = generateEmailOTP();
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

  // Send email before saving the updated pending login.
  await sendEmailOTP(user.email, otp);

  if (!pendingLogin) {
    pendingLogin = new PendingLogin({
      userId: user._id,
      email: user.email,
      otpHash,
      otpAttempts: 0,
      expiresAt: new Date(now.getTime() + PENDING_LOGIN_TTL_MS),
      otpWindowStartedAt: now,
      otpSendCount: 1,
      lastOtpSentAt: now,
    });
  } else {
    const windowStartedAt =
      pendingLogin.otpWindowStartedAt?.getTime() ?? 0;

    const windowExpired =
      now.getTime() - windowStartedAt >= OTP_SEND_WINDOW_MS;

    if (windowExpired) {
      pendingLogin.otpWindowStartedAt = now;
      pendingLogin.otpSendCount = 1;
    } else {
      pendingLogin.otpSendCount += 1;
    }

    pendingLogin.email = user.email;
    pendingLogin.otpHash = otpHash;
    pendingLogin.otpAttempts = 0;
    pendingLogin.lastOtpSentAt = now;
    pendingLogin.expiresAt = new Date(now.getTime() + PENDING_LOGIN_TTL_MS);
  }

  await pendingLogin.save();

  return {
    message: "Password verified. Email OTP sent.",
    email: user.email,
    otpRequired: true,
  };
};
