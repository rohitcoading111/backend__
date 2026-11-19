import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { streamAIController } from "../controllers/ai.controller.js";

const router = express.Router();

// AI chat streaming route
router.post("/chat", streamAIController);

export default router;
