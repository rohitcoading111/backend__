import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// Module creation
export const moduleCreateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many module creation requests. Please try again later.",
  },
});

// Module update and delete
export const moduleMutationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 40,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many module modification requests. Please try again later.",
  },
});
