import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { instructorAccessMiddleware } from "../middleware/instructorAccess.middleware.js";
import {
  createAICourseController,
  streamAIController,
} from "../controllers/ai.controller.js";
import {
  uploadAIImage,
  uploadCourseThumbnail,
} from "../middleware/aiUpload.middleware.js";
import { courseCreateLimiter } from "../middleware/courseRateLimit.middleware.js";

const router = express.Router();

// AI chat streaming route
router.post("/chat", uploadAIImage, streamAIController);

router.post(
  "/create-course",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  courseCreateLimiter,
  uploadCourseThumbnail,
  createAICourseController
);

export default router;
