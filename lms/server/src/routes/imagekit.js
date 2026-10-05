import express from "express";
import { getImageKitAuth } from "../controllers/imagekit.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/auth", authMiddleware, getImageKitAuth);

export default router;