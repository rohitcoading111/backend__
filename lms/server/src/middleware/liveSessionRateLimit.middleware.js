
import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// Create live session
export const liveSessionCreateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many live session creation requests. Please try again later.",
  },
});

// Join live session
export const liveSessionJoinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many live session join requests. Please try again later.",
  },
});

// End live session
export const liveSessionEndLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many live session end requests. Please try again later.",
  },
});
