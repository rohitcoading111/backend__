import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// Public: Create admin request
export const createAdminRequestLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many admin requests. Please try again later.",
  },
});

// Public: Verify email token
export const verifyAdminEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many email verification requests. Please try again later.",
  },
});

// Super Admin: Dashboard actions
export const adminRequestActionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 500,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many admin actions. Please try again later.",
  },
});

// Public: Approve through email
export const approveAdminEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many email approval requests. Please try again later.",
  },
});
