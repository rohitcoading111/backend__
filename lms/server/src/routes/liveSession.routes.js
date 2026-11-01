
import express from "express";

import {
  createLiveSessionController,
  getActiveLiveSessionController,
  endLiveSessionController,
  joinLiveSessionController,
  getLiveKitRoomController,
} from "../controllers/liveSession.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

import {
  instructorAccessMiddleware,
} from "../middleware/instructorAccess.middleware.js";

import {
  createLiveSessionValidator,
  courseIdParamValidator,
  sessionIdParamValidator,
  roomIdParamValidator,
  handleValidationErrors,
} from "../validators/liveSession.validators.js";

const router = express.Router();


// CREATE LIVE SESSION
router.post(
  "/",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  createLiveSessionValidator,
  handleValidationErrors,
  createLiveSessionController
);


// GET ACTIVE LIVE SESSION
router.get(
  "/course/:courseId/active",
  authMiddleware,
  courseIdParamValidator,
  handleValidationErrors,
  getActiveLiveSessionController
);


// JOIN LIVE SESSION
router.post(
  "/:sessionId/join",
  authMiddleware,
  roleMiddleware("STUDENT"),
  sessionIdParamValidator,
  handleValidationErrors,
  joinLiveSessionController
);


// END LIVE SESSION
router.patch(
  "/:sessionId/end",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  sessionIdParamValidator,
  handleValidationErrors,
  endLiveSessionController
);


// GET LIVEKIT ROOM
router.get(
  "/rooms/:roomId",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  instructorAccessMiddleware,
  roomIdParamValidator,
  handleValidationErrors,
  getLiveKitRoomController
);

export default router;
