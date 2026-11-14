
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
import { requireOrganizationPolicyAcceptance } from "../middleware/requireOrganizationPolicyAcceptance.middleware.js";

import {
  instructorSearchLimiter,
  instructorHireLimiter,
  instructorRemoveLimiter,
} from "../middleware/organizationInstructorRateLimit.middleware.js";

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

// 1. Search independent instructors
router.get(
  "/instructors/search",
  authMiddleware,
  organizationAdminMiddleware,
  requireOrganizationPolicyAcceptance,
  instructorSearchLimiter,
  searchIndependentInstructorController
);

// 2. Hire instructor
router.post(
  "/instructors/:userId/hire",
  authMiddleware,
  organizationAdminMiddleware,
  requireOrganizationPolicyAcceptance,
  instructorHireLimiter,
  validateUserId,
  hireInstructorController
);

// 3. Remove instructor
router.patch(
  "/instructors/:instructorId/remove",
  authMiddleware,
  organizationAdminMiddleware,
  requireOrganizationPolicyAcceptance,
  instructorRemoveLimiter,
  validateInstructorId,
  removeInstructorController
);

// 4. Get all instructors
router.get(
  "/instructors",
  authMiddleware,
  organizationAdminMiddleware,
  requireOrganizationPolicyAcceptance,
  getOrganizationInstructorsController
);

export default router;
