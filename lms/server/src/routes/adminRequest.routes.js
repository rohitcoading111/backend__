import express from "express";

import {
  createAdminRequestController,
  getPendingAdminRequestsController,
  approveAdminRequestController,
  rejectAdminRequestController,
  verifyAdminRequestController,
  verifyAdminRequestEmailController,
  approveAdminRequestByEmailController, // ADD THIS
} from "../controllers/adminRequest.controllers.js";

import {
  createAdminRequestValidator,
  adminRequestIdValidator,
  rejectAdminRequestValidator,
} from "../validators/adminRequest.validator.js";

import { validationResult } from "express-validator";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { superAdminMiddleware } from "../middleware/superAdmin.middleware.js";

const router = express.Router();

// Public: Submit an organizatiQQon Admin request
router.post(
  "/",
  createAdminRequestValidator,
  createAdminRequestController
);

// Super Admin: View pending requests
router.get(
  "/",
  authMiddleware,
  superAdminMiddleware,
  getPendingAdminRequestsController
);

// Super Admin: Approve request
router.patch(
  "/:requestId/approve",
  authMiddleware,
  superAdminMiddleware,
  adminRequestIdValidator,
  approveAdminRequestController
);

// Super Admin: Reject request
router.patch(
  "/:requestId/reject",
  authMiddleware,
  superAdminMiddleware,
  rejectAdminRequestValidator,
  rejectAdminRequestController
);

// Public: verification through email button
router.get(
  "/verify-email/:token",
  verifyAdminRequestEmailController
);

// Super Admin: verification through dashboard
router.patch(
  "/:requestId/verify",
  authMiddleware,
  superAdminMiddleware,
  adminRequestIdValidator,
  verifyAdminRequestController
);

// Email button: open confirmation page
router.get(
  "/verify-email/:token",
  verifyAdminRequestEmailController
);

// Confirmation button: actually approve
router.post(
  "/approve-email/:token",
  approveAdminRequestByEmailController
);

export default router;