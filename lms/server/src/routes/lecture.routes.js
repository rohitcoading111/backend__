import express from "express";

import {
  createLectureController,
  getLecturesController,
  updateLectureController,
  deleteLectureController,
} from "../controllers/lecture.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { uploadVideo } from "../middleware/upload.middleware.js";

const router = express.Router();

// Create lecture with video
router.post(
  "/modules/:moduleId/lectures",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  uploadVideo.single("video"),
  createLectureController
);

// Get all lectures of a module
router.get(
  "/lectures/module/:moduleId",
  authMiddleware,
  getLecturesController
);

// Update lecture and video
router.patch(
  "/lectures/:lectureId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  uploadVideo.single("video"),
  updateLectureController
);

// Delete lecture and its video
router.delete(
  "/lectures/:lectureId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  deleteLectureController
);

export default router;