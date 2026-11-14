import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// Create payment order
export const paymentCreateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many payment requests. Please try again later.",
  },
});

// Verify payment
export const paymentVerifyLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many payment verification requests. Please try again later.",
  },
});
