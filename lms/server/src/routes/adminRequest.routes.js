import express from "express";

import {
  createAdminRequestController,
  getPendingAdminRequestsController,
  approveAdminRequestController,
  rejectAdminRequestController,
  verifyAdminRequestController,
  verifyAdminRequestEmailController,
  approveAdminRequestByEmailController,
} from "../controllers/adminRequest.controllers.js";

import {
  createAdminRequestValidator,
  adminRequestIdValidator,
  rejectAdminRequestValidator,
} from "../validators/adminRequest.validator.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { superAdminMiddleware } from "../middleware/superAdmin.middleware.js";

import {
  createAdminRequestLimiter,
  verifyAdminEmailLimiter,
  adminRequestActionLimiter,
  approveAdminEmailLimiter,
} from "../middleware/adminRequestRateLimit.middleware.js";

const router = express.Router();

// Public: Submit organization Admin request
router.post(
  "/",
  createAdminRequestLimiter,
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
  adminRequestActionLimiter,
  adminRequestIdValidator,
  approveAdminRequestController
);

// Super Admin: Reject request
router.patch(
  "/:requestId/reject",
  authMiddleware,
  superAdminMiddleware,
  adminRequestActionLimiter,
  rejectAdminRequestValidator,
  rejectAdminRequestController
);

// Public: Verify through email button
router.get(
  "/verify-email/:token",
  verifyAdminEmailLimiter,
  verifyAdminRequestEmailController
);

// Super Admin: Verify through dashboard
router.patch(
  "/:requestId/verify",
  authMiddleware,
  superAdminMiddleware,
  adminRequestActionLimiter,
  adminRequestIdValidator,
  verifyAdminRequestController
);

// Email button: Actually approve
router.post(
  "/approve-email/:token",
  approveAdminEmailLimiter,
  approveAdminRequestByEmailController
);

export default router;
