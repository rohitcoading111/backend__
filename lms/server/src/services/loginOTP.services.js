
import PendingLogin from "../models/pendingLogin.models.js";
import { sendMobileOTP } from "./otp.services.js";

const OTP_RESEND_COOLDOWN_MS = 60 * 1000;
const OTP_SEND_WINDOW_MS = 60 * 60 * 1000;
const MAX_OTP_SENDS_PER_WINDOW = 5;
const PENDING_LOGIN_TTL_MS = 10 * 60 * 1000;

export const startLoginOTP = async (user) => {
  const now = new Date();

  let pendingLogin = await PendingLogin.findOne({
    userId: user._id,
  });

  // Check whether the previous login session has expired.
  if (pendingLogin && pendingLogin.expiresAt <= now) {
    await PendingLogin.deleteOne({ _id: pendingLogin._id });
    pendingLogin = null;
  }

  // Apply cooldown and rate limits to an existing session.
  if (pendingLogin) {
    const lastSentAt = pendingLogin.lastOtpSentAt?.getTime() ?? 0;

    if (now.getTime() - lastSentAt < OTP_RESEND_COOLDOWN_MS) {
      throw new Error("OTP_COOLDOWN");
    }

    const windowStartedAt =
      pendingLogin.otpWindowStartedAt?.getTime() ?? 0;

    const windowExpired =
      now.getTime() - windowStartedAt >= OTP_SEND_WINDOW_MS;

    if (!windowExpired &&
        pendingLogin.otpSendCount >= MAX_OTP_SENDS_PER_WINDOW) {
      throw new Error("OTP_RATE_LIMIT");
    }
  }

  // Send OTP to the user's registered mobile.
  await sendMobileOTP(user.mobile);

  if (!pendingLogin) {
    pendingLogin = new PendingLogin({
      userId: user._id,
      mobile: user.mobile,
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

    pendingLogin.mobile = user.mobile;
    pendingLogin.lastOtpSentAt = now;
    pendingLogin.expiresAt =
      new Date(now.getTime() + PENDING_LOGIN_TTL_MS);
  }

  await pendingLogin.save();

  return {
    message: "OTP sent successfully",
    mobile: user.mobile,
  };
};
