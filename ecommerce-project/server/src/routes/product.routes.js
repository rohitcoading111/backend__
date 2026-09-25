import express from "express";
import { productValidation } from "../validators/product.validator.js";
import { createProductController } from "../controllers/product.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/products", productValidation,  createProductController);

export default router;