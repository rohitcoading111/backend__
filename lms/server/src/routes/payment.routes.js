import express from "express";

import {
  createPaymentRequestController,
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

export default router;