import express from "express";
import { createCourseController } from "../controllers/course.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import { courseValidation } from "../validators/course.validator.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  upload.single("thumbnail"),
  courseValidation,
  createCourseController
);

export default router;