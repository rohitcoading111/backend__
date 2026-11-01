
import express from "express";

import {
  createOrganizationController,
  getMyOrganizationController,
} from "../controllers/organization.controllers.js";

import {
  createOrganizationValidator,
} from "../validators/organization.validator.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import {roleMiddleware} from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createOrganizationValidator,
  createOrganizationController
);

router.get(
  "/me",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getMyOrganizationController
);

export default router;
