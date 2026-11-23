import express from "express";

import {
  createInterviewQuestionController,
  updateInterviewQuestionController,
  deleteInterviewQuestionController,
  getAllInterviewQuestionsController,
  getSingleQuestionController,
  markQuestionCompletedController,
  getMyInterviewProgressController,
} from "../controllers/interviewQuestion.controller.js";

import { superAdminMiddleware } from "../middleware/superAdmin.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public Read Routes
router.get("/questions", getAllInterviewQuestionsController);
router.get("/questions/:questionId", getSingleQuestionController);

// Protected Admin CRUD Routes
router.post(
  "/questions",
  authMiddleware,
  superAdminMiddleware,
  createInterviewQuestionController
);

router.patch(
  "/questions/:questionId",
  authMiddleware,
  superAdminMiddleware,
  updateInterviewQuestionController
);

router.delete(
  "/questions/:questionId",
  authMiddleware,
  superAdminMiddleware,
  deleteInterviewQuestionController
);

// User Progress Routes (Authenticated Users Only)
router.post(
  "/questions/:questionId/complete",
  authMiddleware,
  markQuestionCompletedController
);

router.get(
  "/progress",
  authMiddleware,
  getMyInterviewProgressController
);

router.get("/questions", getAllInterviewQuestionsController);

router.get("/questions/:questionId", getSingleQuestionController);

export default router;