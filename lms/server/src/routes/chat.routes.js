import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getChatHistoryController,
} from "../controllers/chat.controllers.js";

const router = express.Router();

// Get live chat history
router.get(
  "/live/:liveSessionId",
  authMiddleware,
  getChatHistoryController
);

export default router;
