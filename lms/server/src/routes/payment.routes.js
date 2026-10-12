import express from "express";

import {
  createPaymentRequestController,
  getMyPaymentController,
} from "../controllers/payment.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("STUDENT"),
  createPaymentRequestController
);

router.get(
  "/:paymentId",
  authMiddleware,
  roleMiddleware("STUDENT"),
  getMyPaymentController
);

export default router;