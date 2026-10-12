import express from "express";

import {
  getMyEnrollmentsController,
} from "../controllers/enrollment.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

// Get logged-in student's active enrollments
router.get(
  "/my-enrollments",
  authMiddleware,
  roleMiddleware("STUDENT"),
  getMyEnrollmentsController
);

export default router;