import express from "express";

import {
  acceptOrganizationPoliciesController,
  getOrganizationPolicyStatusController,
} from "../controllers/organizationPolicyAcceptance.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { organizationAdminMiddleware } from "../middleware/organizationAdmin.middleware.js";
import { validatePolicyAcceptanceRequest } from "../validators/organizationPolicyAcceptance.validators.js";

const router = express.Router();

router.get(
  "/current",
  authMiddleware,
  organizationAdminMiddleware,
  getOrganizationPolicyStatusController
);

router.post(
  "/accept",
  authMiddleware,
  organizationAdminMiddleware,
  validatePolicyAcceptanceRequest,
  acceptOrganizationPoliciesController
);

export default router;
