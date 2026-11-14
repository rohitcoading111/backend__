
import express from "express";

import {
  getAllOrganizationsAnalyticsController,
  getOrganizationAnalyticsController,
  getMyOrganizationAnalyticsController,
} from "../controllers/paymentAnalytics.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { organizationAdminMiddleware } from "../middleware/organizationAdmin.middleware.js";
import { requireOrganizationPolicyAcceptance } from "../middleware/requireOrganizationPolicyAcceptance.middleware.js";

import {
  allOrganizationsAnalyticsLimiter,
  organizationAnalyticsLimiter,
  myOrganizationAnalyticsLimiter,
} from "../middleware/paymentAnalyticsRateLimit.middleware.js";

const router = express.Router();

// SUPER ADMIN: All organizations analytics
router.get(
  "/super-admin",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  allOrganizationsAnalyticsLimiter,
  getAllOrganizationsAnalyticsController
);

// SUPER ADMIN: Particular organization's analytics
router.get(
  "/organization/:organizationId",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  organizationAnalyticsLimiter,
  getOrganizationAnalyticsController
);

// ORGANIZATION ADMIN: Own organization analytics
router.get(
  "/organization",
  authMiddleware,
  organizationAdminMiddleware,
  requireOrganizationPolicyAcceptance,
  myOrganizationAnalyticsLimiter,
  getMyOrganizationAnalyticsController
);

export default router;
