import { rateLimit, ipKeyGenerator } from "express-rate-limit";
import { isIP } from "node:net";

// Get client IP from Render's forwarded header
const getClientIp = (req) => {
  const forwardedFor = req.get("x-forwarded-for");

  // First IP represents the original client in the observed Render chain
  const forwardedIp = forwardedFor?.split(",")[0]?.trim();

  if (forwardedIp && isIP(forwardedIp)) {
    return ipKeyGenerator(forwardedIp);
  }

  // Fallback if forwarded IP is unavailable
  return ipKeyGenerator(req.ip);
};

// Common rate limiter configuration
const createAuthLimiter = (options) => {
  return rateLimit({
    ...options,
    keyGenerator: getClientIp,
  });
};

// Login requests
export const loginLimiter = createAuthLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

// New account registration
export const registerLimiter = createAuthLimiter({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many registration attempts. Please try again later.",
  },
});

// OTP verification requests
export const otpVerificationLimiter = createAuthLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many OTP verification attempts. Please try again later.",
  },
});

// Forgot password requests
export const forgotPasswordLimiter = createAuthLimiter({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many password recovery requests. Please try again later.",
  },
});

// Password reset requests
export const resetPasswordLimiter = createAuthLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many password reset attempts. Please try again later.",
  },
});

// Google OAuth login
export const googleAuthLimiter = createAuthLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (req, res) => {
    return res.redirect(
      `${process.env.FRONTEND_URL}/login?error=google_rate_limit`
    );
  },
});

// Google OAuth callback
export const googleCallbackLimiter = createAuthLimiter({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many Google authentication callbacks. Please try again later.",
  },
});

// Google account registration
export const googleRegisterLimiter = createAuthLimiter({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many Google registration attempts. Please try again later.",
  },
});
