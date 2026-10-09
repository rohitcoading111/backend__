import express from "express";
import {
  createModuleController,
  updateModuleController,
  deleteModuleController,
} from "../controllers/module.controllers.js";
import { createLectureController } from "../controllers/lecture.controllers.js";
import { uploadVideo } from "../middleware/upload.middleware.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(  
  "/courses/:courseId/modules",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  createModuleController
);

router.patch(
  "/:moduleId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  updateModuleController
);

router.delete(
  "/:moduleId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  deleteModuleController
);


router.post(
  "/:moduleId/lectures",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  uploadVideo.single("video"),
  createLectureController
);

export default router;