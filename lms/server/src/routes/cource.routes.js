import express from "express";

import {
  createCourseController,
  getMyCourses,
  getSingleCourseController,
  updateCourseController,
} from "../controllers/course.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

import { courseValidation } from "../validators/course.validator.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  upload.single("thumbnail"),
  courseValidation,
  createCourseController
);

router.get(
  "/my-courses",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  getMyCourses
);

router.get(
  "/:courseId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  getSingleCourseController
);

router.patch(
  "/:courseId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  upload.single("thumbnail"),
  updateCourseController
);

export default router;