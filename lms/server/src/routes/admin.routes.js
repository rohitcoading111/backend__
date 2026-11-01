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
import { roleValidation } from "../validators/admin.validator.js";

const router = express.Router();

router.patch(
  "/users/:userId/suspend",
  authMiddleware,
  superAdminMiddleware,
  suspendOrganizationAdminValidator,
  suspendOrganizationAdminController
);
router.get(
  "/users",
  authMiddleware,
  superAdminMiddleware,
  getAllUsers
);

export default router;