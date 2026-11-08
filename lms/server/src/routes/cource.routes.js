
import express from "express";

import {
  createCourseController,
  getMyCourses,
  getSingleCourseController,
  updateCourseController,
  deleteCourseController,
  publishCourseController,
  unpublishCourseController,
  getPublishedCoursesController,
} from "../controllers/course.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { instructorAccessMiddleware } from "../middleware/instructorAccess.middleware.js";

import upload from "../middleware/upload.middleware.js";
import { courseValidation } from "../validators/course.validator.js";

const router = express.Router();

// Public: Published Courses
router.get("/published", getPublishedCoursesController);

// All protected instructor routes
router.use(
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware
);

// Create Course
router.post(
  "/",
  upload.single("thumbnail"),
  courseValidation,
  createCourseController
);

// Get My Courses
router.get("/my-courses", getMyCourses);

// Get Single Course
router.get("/:courseId", getSingleCourseController);

// Update Course
router.patch(
  "/:courseId",
  upload.single("thumbnail"),
  updateCourseController
);

// Delete Course
router.delete("/:courseId", deleteCourseController);

// Publish Course
router.patch("/:courseId/publish", publishCourseController);

// Unpublish Course
router.patch("/:courseId/unpublish", unpublishCourseController);

export default router;
