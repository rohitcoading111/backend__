
import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// Create bank details
export const bankDetailsCreateLimiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  limit: 3,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many bank details creation requests. Try again later.",
  },
});

// Update bank details
export const bankDetailsUpdateLimiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many bank details update requests. Try again later.",
  },
});

// Upload bank proof
export const bankProofUploadLimiter = rateLimit({
  windowMs: 20 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many bank proof uploads. Try again later.",
  },
});

// Super Admin actions
export const bankDetailsAdminActionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5000,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many bank details admin actions. Try again later.",
  },
});
