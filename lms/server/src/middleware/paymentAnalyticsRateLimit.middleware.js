import { rateLimit } from "express-rate-limit";
import { getClientIp } from "./clientIp.js";

// Super Admin: All organizations analytics
export const allOrganizationsAnalyticsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many analytics requests. Please try again later.",
  },
});

// Super Admin: Particular organization analytics
export const organizationAnalyticsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many organization analytics requests. Please try again later.",
  },
});

// Organization Admin: Own organization analytics
export const myOrganizationAnalyticsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  keyGenerator: getClientIp,
  message: {
    success: false,
    message: "Too many analytics requests. Please try again later.",
  },
});
