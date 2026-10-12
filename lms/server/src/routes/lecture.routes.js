import express from "express";

import {
  createLectureController,
  getLecturesController,
  updateLectureController,
  deleteLectureController,
} from "../controllers/lecture.controllers.js";

import {
  validateLecture,
  validateUpdateLecture,
  validateLectureId,
  validateModuleId,
  checkValidation,
} from "../validators/lecture.validator.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { uploadVideo } from "../middleware/upload.middleware.js";

const router = express.Router();

// Create lecture
router.post(
  "/modules/:moduleId/lectures",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  validateModuleId,
  uploadVideo.single("video"),
  validateLecture,
  checkValidation,
  createLectureController
);

// Get all lectures of a module
router.get(
  "/lectures/module/:moduleId",
  authMiddleware,
  validateModuleId,
  checkValidation,
  getLecturesController
);

// Update lecture
router.patch(
  "/lectures/:lectureId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  validateLectureId,
  uploadVideo.single("video"),
  validateUpdateLecture,
  checkValidation,
  updateLectureController
);
// Delete lecture
router.delete(
  "/lectures/:lectureId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  validateLectureId,
  checkValidation,
  deleteLectureController
);

export default router;