
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

const router = express.Router();

// ==========================================
// SUPER ADMIN ONLY
// All organizations analytics
// ==========================================

router.get(
  "/super-admin",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  getAllOrganizationsAnalyticsController
);

// ==========================================
// SUPER ADMIN ONLY
// Particular organization's analytics
// ==========================================

router.get(
  "/organization/:organizationId",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  getOrganizationAnalyticsController
);

// ==========================================
// ORGANIZATION ADMIN ONLY
// Own organization analytics
// ==========================================

router.get(
  "/organization",
  authMiddleware,
  organizationAdminMiddleware,
  requireOrganizationPolicyAcceptance,
  getMyOrganizationAnalyticsController
);

export default router;
