import express from "express";
import { getImageKitAuth } from "../controllers/imagekit.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { imageUploadValidation } from "../validators/imagekit.validator.js";

const router = express.Router();

router.post(
  "/auth",
  authMiddleware,
  imageUploadValidation,
  getImageKitAuth
);
export default router;