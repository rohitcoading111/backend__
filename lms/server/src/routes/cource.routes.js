
import express from "express";

import {
  createCourseController,
  getMyCourses,
  getSingleCourseController,
  updateCourseController,
  deleteCourseController,
  publishCourseController,
  unpublishCourseController,
  getPublishedCoursesController
} from "../controllers/course.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { instructorAccessMiddleware } from "../middleware/instructorAccess.middleware.js";

import upload from "../middleware/upload.middleware.js";

import { courseValidation } from "../validators/course.validator.js";

const router = express.Router();

// Create Course
router.post(
  "/",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  upload.single("thumbnail"),
  courseValidation,
  createCourseController
);

// Get My Courses
router.get(
  "/my-courses",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  getMyCourses
);

// Public: anyone can view published courses
router.get(
  "/published",
  getPublishedCoursesController
);

// Get Single Course
router.get(
  "/:courseId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  getSingleCourseController
);

// Update Course
router.patch(
  "/:courseId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  upload.single("thumbnail"),
  updateCourseController
);

// Delete Course
router.delete(
  "/:courseId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  deleteCourseController
);

// Publish Course
router.patch(
  "/:courseId/publish",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  publishCourseController
);

// Unpublish Course
router.patch(
  "/:courseId/unpublish",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  unpublishCourseController
);

export default router;
