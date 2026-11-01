
import express from "express";

import {
  createModuleController,
  updateModuleController,
  deleteModuleController,
  getModulesController,
} from "../controllers/module.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import {
  instructorAccessMiddleware,
} from "../middleware/instructorAccess.middleware.js";

const router = express.Router();

// Create Module
router.post(
  "/courses/:courseId/modules",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  createModuleController
);

// Update Module
router.patch(
  "/:moduleId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  updateModuleController
);

// Delete Module
router.delete(
  "/:moduleId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  deleteModuleController
);

// Get Modules
router.get(
  "/courses/:courseId/modules",
  authMiddleware,
  getModulesController
);

export default router;
