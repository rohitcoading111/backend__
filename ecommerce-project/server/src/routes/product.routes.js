import express from "express";
import { productValidation } from "../validators/product.validator.js";
import { createProductController,getAllProductsController } from "../controllers/product.controllers.js";
import { authMiddleware,sellerMiddleware } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

router.post( "/products",authMiddleware,sellerMiddleware,upload.single("image"),productValidation,createProductController);
router.get("/allproducts", getAllProductsController);

export default router;