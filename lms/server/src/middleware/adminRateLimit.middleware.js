
import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// General admin limiter
export const adminRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many admin requests. Please try again later.",
  },
});

// Admin read operations
export const adminReadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 60,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many admin read requests. Please try again later.",
  },
});

// Sensitive admin operations
export const adminActionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many admin actions. Please try again later.",
  },
});
