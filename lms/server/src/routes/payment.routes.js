
import express from "express";

import {
  createPaymentRequestController,
  getMyPaymentController,
  verifyPaymentController
} from "../controllers/payment.controllers.js";

import {
  createPaymentValidator,
  verifyPaymentValidator,
  handleValidationErrors,
} from "../validators/payment.validators.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

import {
  paymentCreateLimiter,
  paymentVerifyLimiter,
} from "../middleware/paymentRateLimit.middleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("STUDENT"),
  paymentCreateLimiter,
  createPaymentValidator,
  handleValidationErrors,
  createPaymentRequestController
);

router.post(
  "/verify",
  authMiddleware,
  roleMiddleware("STUDENT"),
  paymentVerifyLimiter,
  verifyPaymentValidator,
  handleValidationErrors,
  verifyPaymentController
);

router.get(
  "/:paymentId",
  authMiddleware,
  roleMiddleware("STUDENT"),
  getMyPaymentController
);

export default router;
