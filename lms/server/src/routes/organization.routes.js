import express from "express";

import {
  createOrganizationController,
  getMyOrganizationController,
} from "../controllers/organization.controllers.js";

import {
  createOrganizationValidator,
} from "../validators/organization.validator.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { organizationAdminMiddleware } from "../middleware/organizationAdmin.middleware.js";

const router = express.Router();

// Create Organization
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createOrganizationValidator,
  createOrganizationController
);

// Get logged-in Organization Admin's organization
router.get(
  "/me",
  authMiddleware,
  organizationAdminMiddleware,
  getMyOrganizationController
);

export default router;