
import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// Create Lecture
export const lectureCreateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many lecture creation requests. Please try again later.",
  },
});

// Update Lecture
export const lectureUpdateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 40,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many lecture update requests. Please try again later.",
  },
});

// Delete Lecture
export const lectureDeleteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many lecture deletion requests. Please try again later.",
  },
});

// Mark Lecture Completed
export const lectureCompletionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many lecture completion requests. Please try again later.",
  },
});
