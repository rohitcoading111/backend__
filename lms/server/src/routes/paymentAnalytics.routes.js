
import express from "express";

import {
  getAllOrganizationsAnalyticsController,
  getOrganizationAnalyticsController,
  getMyOrganizationAnalyticsController,
} from "../controllers/paymentAnalytics.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

// ==========================================
// SUPER ADMIN
// Get all organizations payment analytics
// ==========================================

router.get(
  "/super-admin",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  getAllOrganizationsAnalyticsController
);

// ==========================================
// SUPER ADMIN
// Get a particular organization's analytics
// ==========================================

router.get(
  "/organization/:organizationId",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  getOrganizationAnalyticsController
);

// ==========================================
// ORGANIZATION ADMIN
// Get own organization's analytics
// ==========================================

router.get(
  "/organization",
  authMiddleware,
  roleMiddleware("ORGANIZATION_ADMIN"),
  getMyOrganizationAnalyticsController
);

export default router;
