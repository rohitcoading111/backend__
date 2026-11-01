
import express from "express";

import {
  searchIndependentInstructorController,
} from "../controllers/organizationInstructor.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { organizationAdminMiddleware } from "../middleware/organizationAdmin.middleware.js";

const router = express.Router();

// Search independent instructors by exact email or instructorCode
router.get(
  "/instructors/search",
  authMiddleware,
  organizationAdminMiddleware,
  searchIndependentInstructorController
);

export default router;
