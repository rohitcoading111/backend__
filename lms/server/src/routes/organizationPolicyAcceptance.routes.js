
import express from "express";

import {
  acceptOrganizationPoliciesController,
  getOrganizationPolicyStatusController,
} from "../controllers/organizationPolicyAcceptance.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { organizationAdminMiddleware } from "../middleware/organizationAdmin.middleware.js";

import {
  policyAcceptanceLimiter,
} from "../middleware/organizationPolicyRateLimit.middleware.js";

import { validatePolicyAcceptanceRequest } from "../validators/organizationPolicyAcceptance.validators.js";

const router = express.Router();

// Get current policy status
router.get(
  "/current",
  authMiddleware,
  organizationAdminMiddleware,
  getOrganizationPolicyStatusController
);

// Accept organization policies
router.post(
  "/accept",
  authMiddleware,
  organizationAdminMiddleware,
  policyAcceptanceLimiter,
  validatePolicyAcceptanceRequest,
  acceptOrganizationPoliciesController
);

export default router;
