
import express from "express";
import { param, validationResult } from "express-validator";

import {
  searchIndependentInstructorController,
  hireInstructorController,
  removeInstructorController,
  getOrganizationInstructorsController,
} from "../controllers/organizationInstructor.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { organizationAdminMiddleware } from "../middleware/organizationAdmin.middleware.js";

const router = express.Router();

// MongoDB User ID validation
const validateUserId = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid instructor user ID"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

// MongoDB Instructor ID validation
const validateInstructorId = [
  param("instructorId")
    .isMongoId()
    .withMessage("Invalid instructor user ID"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

// 1. Search independent instructors by exact email or instructorCode
router.get(
  "/instructors/search",
  authMiddleware,
  organizationAdminMiddleware,
  searchIndependentInstructorController
);

// 2. Hire instructor into Admin's organization
router.post(
  "/instructors/:userId/hire",
  authMiddleware,
  organizationAdminMiddleware,
  validateUserId,
  hireInstructorController
);

// 3. Remove instructor from Admin's organization
router.patch(
  "/instructors/:instructorId/remove",
  authMiddleware,
  organizationAdminMiddleware,
  validateInstructorId,
  removeInstructorController
);


// Get all instructors of logged-in Admin's organization
router.get(
  "/instructors",
  authMiddleware,
  organizationAdminMiddleware,
  getOrganizationInstructorsController
);
export default router;
