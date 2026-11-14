
import express from "express";

import {
  suspendOrganizationAdminValidator,
} from "../validators/organizationAdmin.validator.js";

import {
  getAllUsers,
  suspendOrganizationAdminController,
} from "../controllers/admin.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { superAdminMiddleware } from "../middleware/superAdmin.middleware.js";

import {
  adminReadLimiter,
  adminActionLimiter,
} from "../middleware/adminRateLimit.middleware.js";

const router = express.Router();

// Suspend organization admin
router.patch(
  "/users/:userId/suspend",
  authMiddleware,
  superAdminMiddleware,
  adminActionLimiter,
  suspendOrganizationAdminValidator,
  suspendOrganizationAdminController
);

// Get all users
router.get(
  "/users",
  authMiddleware,
  superAdminMiddleware,
  adminReadLimiter,
  getAllUsers
);

export default router;
