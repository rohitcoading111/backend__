
import express from "express";

import { createLiveSessionController } from "../controllers/liveSession.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("INSTRUCTOR"),
  createLiveSessionController
);

export default router;
