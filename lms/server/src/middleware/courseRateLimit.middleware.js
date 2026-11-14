import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// Course creation
export const courseCreateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many course creation requests. Please try again later.",
  },
});

// Course update, delete, publish and unpublish
export const courseMutationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many course modification requests. Please try again later.",
  },
});
