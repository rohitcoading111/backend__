import express from "express";
import { createModuleController } from "../controllers/module.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/courses/:courseId/modules",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  createModuleController
);

export default router;