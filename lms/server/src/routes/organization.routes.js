import express from "express";

import {
  createOrganizationController,
  getMyOrganizationController,
  getAvailableOrganizationsController,
  getInstructorOrganizationOverviewController
} from "../controllers/organization.controllers.js";

import {
  createOrganizationValidator,
} from "../validators/organization.validator.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { organizationAdminMiddleware } from "../middleware/organizationAdmin.middleware.js";
import { instructorAccessMiddleware } from "../middleware/instructorAccess.middleware.js";

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

// Independent instructors: browse available organizations
router.get(
  "/available",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  getAvailableOrganizationsController
);


router.get(
  "/instructor-overview",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  getInstructorOrganizationOverviewController
);

export default router;