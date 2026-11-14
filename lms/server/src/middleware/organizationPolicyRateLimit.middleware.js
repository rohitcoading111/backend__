import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// Accept organization policies
export const policyAcceptanceLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many policy acceptance requests. Please try again later.",
  },
});
