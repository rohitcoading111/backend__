
import express from "express";

import {
  createBankDetailsController,
  updateBankDetailsController,
  getMyBankDetailsController,
  getAllBankDetailsController,
  getOrganizationBankDetailsController,
  verifyBankDetailsController,
rejectBankDetailsController,
  uploadBankProofController,
} from "../controllers/organizationBankDetails.controllers.js";

import {
  createBankDetailsValidator,
  updateBankDetailsValidator,
  handleBankDetailsValidationErrors,
} from "../validators/organizationBankDetails.validators.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { organizationAdminMiddleware } from "../middleware/organizationAdmin.middleware.js";
import { uploadBankProof } from "../middleware/upload.middleware.js";

const router = express.Router();

// ==========================================
// ORGANIZATION ADMIN ROUTES
// ==========================================

// Submit own organization's bank details
router.post(
  "/my-bank-details",
  authMiddleware,
  organizationAdminMiddleware,
  uploadBankProof,
  createBankDetailsValidator,
  handleBankDetailsValidationErrors,
  createBankDetailsController
);

// Update own organization's bank details
router.patch(
  "/my-bank-details",
  authMiddleware,
  organizationAdminMiddleware,
  uploadBankProof,
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

router.post(
  "/my-bank-details/bank-proof",
  authMiddleware,
  organizationAdminMiddleware,
  uploadBankProof,
  uploadBankProofController
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


// Verify Organization Bank Details
router.patch(
  "/super-admin/:organizationId/verify",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  verifyBankDetailsController
);

// Reject Organization Bank Details
router.patch(
  "/super-admin/:organizationId/reject",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  rejectBankDetailsController
);

export default router;
