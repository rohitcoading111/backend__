import express from "express";

import {
  createInterviewQuestionController,
  updateInterviewQuestionController,
  deleteInterviewQuestionController,
  getAllInterviewQuestionsController,
  getSingleQuestionController,
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

router.get("/questions", getAllInterviewQuestionsController);

router.get("/questions/:questionId", getSingleQuestionController);

export default router;