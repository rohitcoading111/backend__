import express from "express";

import {
  createModuleController,
  updateModuleController,
  deleteModuleController,
  getModulesController,
} from "../controllers/module.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

// Create Module
router.post(
  "/courses/:courseId/modules",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  createModuleController
);

// Update Module
router.patch(
  "/:moduleId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  updateModuleController
);

// Delete Module
router.delete(
  "/:moduleId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  deleteModuleController
);

// Get Modules
router.get(
  "/courses/:courseId/modules",
  authMiddleware,
  getModulesController
);

export default router;