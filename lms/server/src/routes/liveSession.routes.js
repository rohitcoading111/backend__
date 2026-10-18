
import express from "express";

import { createLiveSessionController,getActiveLiveSessionController,endLiveSessionController,joinLiveSessionController } from "../controllers/liveSession.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  createLiveSessionController
);

router.get(
  "/course/:courseId/active",
  authMiddleware,
  getActiveLiveSessionController
);

router.patch(
  "/:sessionId/end",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  endLiveSessionController
);

router.post(
  "/:sessionId/join",
  authMiddleware,
  roleMiddleware("STUDENT"),
  joinLiveSessionController
);

export default router;
