import express from "express";

import {
  updateUserRole,
  getAllUsers,
} from "../controllers/admin.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { superAdminMiddleware } from "../middleware/superAdmin.middleware.js";
import { roleValidation } from "../validators/admin.validator.js";

const router = express.Router();

router.patch(
  "/users/:userId/role",
  authMiddleware,
  superAdminMiddleware,
  roleValidation,
  updateUserRole
);

router.get(
  "/users",
  authMiddleware,
  superAdminMiddleware,
  getAllUsers
);

export default router;