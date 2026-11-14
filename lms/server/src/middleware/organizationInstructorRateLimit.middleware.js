import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// Search instructors
export const instructorSearchLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many instructor search requests. Please try again later.",
  },
});

// Hire instructor
export const instructorHireLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many instructor hiring requests. Please try again later.",
  },
});

// Remove instructor
export const instructorRemoveLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 15,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many instructor removal requests. Please try again later.",
  },
});
