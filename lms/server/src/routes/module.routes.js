import express from "express";
import {
  createModuleController,
  updateModuleController,
  deleteModuleController,
  getModulesController
} from "../controllers/module.controllers.js";
import { createLectureController,updateLectureController,deleteLectureController } from "../controllers/lecture.controllers.js";
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

router.patch(
  "/lectures/:lectureId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  uploadVideo.single("video"),
  updateLectureController
);

router.delete(
  "/lectures/:lectureId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  deleteLectureController
);


router.get(
  "/courses/:courseId/modules",
  authMiddleware,
  getModulesController
);

export default router;