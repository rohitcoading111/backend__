import express from "express";

import {
  createAdminRequestController,
  getPendingAdminRequestsController,
  approveAdminRequestController,
  rejectAdminRequestController,
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

// Public: Submit an organization Admin request
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

export default router;