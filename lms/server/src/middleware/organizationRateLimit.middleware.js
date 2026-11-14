
import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// Create organization
export const organizationCreateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many organization creation requests. Please try again later.",
  },
});
