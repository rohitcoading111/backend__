
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
import { requireOrganizationPolicyAcceptance } from "../middleware/requireOrganizationPolicyAcceptance.middleware.js";
import { uploadBankProof } from "../middleware/upload.middleware.js";

import {
  bankDetailsCreateLimiter,
  bankDetailsUpdateLimiter,
  bankProofUploadLimiter,
  bankDetailsAdminActionLimiter,
} from "../middleware/organizationBankDetailsRateLimit.middleware.js";

const router = express.Router();

// ==========================================
// ORGANIZATION ADMIN ROUTES
// ==========================================

// Submit own organization's bank details
router.post(
  "/my-bank-details",
  authMiddleware,
  organizationAdminMiddleware,
  requireOrganizationPolicyAcceptance,
  bankDetailsCreateLimiter,
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
  requireOrganizationPolicyAcceptance,
  bankDetailsUpdateLimiter,
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
  requireOrganizationPolicyAcceptance,
  getMyBankDetailsController
);

// Upload bank proof
router.post(
  "/my-bank-details/bank-proof",
  authMiddleware,
  organizationAdminMiddleware,
  requireOrganizationPolicyAcceptance,
  bankProofUploadLimiter,
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

// Get particular organization's bank details
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
  bankDetailsAdminActionLimiter,
  verifyBankDetailsController
);

// Reject Organization Bank Details
router.patch(
  "/super-admin/:organizationId/reject",
  authMiddleware,
  roleMiddleware("SUPER_ADMIN"),
  bankDetailsAdminActionLimiter,
  rejectBankDetailsController
);

export default router;
