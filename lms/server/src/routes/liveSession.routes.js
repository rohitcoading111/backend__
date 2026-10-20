
import express from "express";

import { createLiveSessionController,getActiveLiveSessionController,endLiveSessionController,joinLiveSessionController,getLiveKitRoomController } from "../controllers/liveSession.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import {
  createLiveSessionValidator,
  courseIdParamValidator,
  sessionIdParamValidator,
  roomIdParamValidator,
  handleValidationErrors
} from "../validators/liveSession.validators.js";
const router = express.Router();

router.post(
  "/live-sessions",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  createLiveSessionValidator,
  handleValidationErrors,
  createLiveSessionController
);

router.get(
  "/course/:courseId/active",
  authMiddleware,
  courseIdParamValidator,
  handleValidationErrors,
  getActiveLiveSessionController
);

router.post(
  "/:sessionId/join",
  authMiddleware,
  roleMiddleware("STUDENT"),
  sessionIdParamValidator,
  handleValidationErrors,
  joinLiveSessionController
);

router.patch(
  "/:sessionId/end",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  sessionIdParamValidator,
  handleValidationErrors,
  endLiveSessionController
);

router.get(
  "/rooms/:roomId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  roomIdParamValidator,
  handleValidationErrors,
  getLiveKitRoomController
);



export default router;
