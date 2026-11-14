import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

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

// Registration
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

// OTP verification
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

// Forgot password
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

// Reset password
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

// Google registration
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
