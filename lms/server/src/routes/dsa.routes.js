import express from "express";

import {
    createDsaQuestionController,
    getAllDsaQuestionsController,
    getSingleDsaQuestionController,
    updateDsaQuestionController,
    deleteDsaQuestionController,
    markQuestionSolvedController,
    getStudentDsaProgressController,
    getDueRevisionsController,
    markQuestionRevisedController,
    getStudentDsaRevisionHistoryController
} from "../controllers/dsa.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

// ========================================
// QUESTION BANK
// ========================================

// Get all active questions
router.get(
    "/questions",
    authMiddleware,
    roleMiddleware("STUDENT", "INSTRUCTOR"),
    getAllDsaQuestionsController
);

// Get personal progress
router.get(
    "/my/progress",
    authMiddleware,
    roleMiddleware("STUDENT", "INSTRUCTOR"),
    getStudentDsaProgressController
);

// Get due revisions
router.get(
    "/my/due-revisions",
    authMiddleware,
    roleMiddleware("STUDENT", "INSTRUCTOR"),
    getDueRevisionsController
);

// Get revision history
router.get(
    "/my/revision-history",
    authMiddleware,
    roleMiddleware("STUDENT", "INSTRUCTOR"),
    getStudentDsaRevisionHistoryController
);

// Create question
router.post(
    "/questions",
    authMiddleware,
    roleMiddleware("STUDENT", "INSTRUCTOR"),
    createDsaQuestionController
);

// Get single question
router.get(
    "/questions/:questionId",
    authMiddleware,
    roleMiddleware("STUDENT", "INSTRUCTOR"),
    getSingleDsaQuestionController
);

// Update question
router.patch(
    "/questions/:questionId",
    authMiddleware,
    roleMiddleware("STUDENT", "INSTRUCTOR"),
    updateDsaQuestionController
);

// Soft delete question
router.delete(
    "/questions/:questionId",
    authMiddleware,
    roleMiddleware("STUDENT", "INSTRUCTOR"),
    deleteDsaQuestionController
);

// ========================================
// SOLVE & REVISION
// ========================================

// Mark question as solved
router.post(
    "/questions/:questionId/solve",
    authMiddleware,
    roleMiddleware("STUDENT", "INSTRUCTOR"),
    markQuestionSolvedController
);

// Mark question as revised
router.post(
    "/questions/:questionId/revise",
    authMiddleware,
    roleMiddleware("STUDENT", "INSTRUCTOR"),
    markQuestionRevisedController
);

export default router;
