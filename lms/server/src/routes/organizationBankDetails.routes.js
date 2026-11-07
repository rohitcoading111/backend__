
import express from "express";

import {
  createBankDetailsController,
  updateBankDetailsController,
  getMyBankDetailsController,
  getAllBankDetailsController,
  getOrganizationBankDetailsController,
} from "../controllers/organizationBankDetails.controllers.js";

import {
  createBankDetailsValidator,
  updateBankDetailsValidator,
  handleBankDetailsValidationErrors,
} from "../validators/organizationBankDetails.validators.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { organizationAdminMiddleware } from "../middleware/organizationAdmin.middleware.js";

const router = express.Router();

// ==========================================
// ORGANIZATION ADMIN ROUTES
// ==========================================

// Submit own organization's bank details
router.post(
  "/my-bank-details",
  authMiddleware,
  organizationAdminMiddleware,
  createBankDetailsValidator,
  handleBankDetailsValidationErrors,
  createBankDetailsController
);

// Update own organization's bank details
router.patch(
  "/my-bank-details",
  authMiddleware,
  organizationAdminMiddleware,
  updateBankDetailsValidator,
  handleBankDetailsValidationErrors,
  updateBankDetailsController
);

// Get own organization's bank details
router.get(
  "/my-bank-details",
  authMiddleware,
  organizationAdminMiddleware,
  getMyBankDetailsController
);

// ==========================================
// SUPER ADMIN ROUTES
// ==========================================

// Get all organizations' bank details
router.get(
  "/super-admin",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  getAllBankDetailsController
);

// Get a particular organization's bank details
router.get(
  "/super-admin/:organizationId",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  getOrganizationBankDetailsController
);

export default router;
