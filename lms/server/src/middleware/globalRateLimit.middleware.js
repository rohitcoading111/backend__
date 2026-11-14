import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// Global API Rate Limiter
export const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,

  keyGenerator: getClientIp,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});
