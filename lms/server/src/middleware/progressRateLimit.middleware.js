import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

export const lectureProgressLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many progress update requests. Please try again later.",
  },
});
