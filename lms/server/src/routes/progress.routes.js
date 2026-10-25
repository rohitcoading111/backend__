
import { Router } from "express";

import {
  completeLecture,
  fetchCourseProgress,
  fetchLearningSummary,
} from "../controllers/progress.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

// Dashboard ki overall learning summary
router.get(
  "/summary",
  authMiddleware,
  fetchLearningSummary
);

// Kisi particular course ki progress
router.get(
  "/course/:courseId",
  authMiddleware,
  fetchCourseProgress
);

// Lecture ko complete mark karna
router.patch(
  "/lecture/:lectureId/complete",
  authMiddleware,
  completeLecture
);

export default router;
