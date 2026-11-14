import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

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
