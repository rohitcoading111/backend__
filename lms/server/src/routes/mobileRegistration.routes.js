import express from "express";
import {
  startMobileRegistrationController,
  verifyMobileRegistrationController,
} from "../controllers/mobileRegistration.controllers.js";

import {
  mobileRegistrationValidator,
  verifyMobileOTPValidator,
  checkMobileRegistrationValidation,
} from "../validators/mobileRegistration.validator.js";

const router = express.Router();

router.post(
  "/register",
  mobileRegistrationValidator,
  checkMobileRegistrationValidation,
  startMobileRegistrationController
);

router.post(
  "/verify-otp",
  verifyMobileOTPValidator,
  checkMobileRegistrationValidation,
  verifyMobileRegistrationController
);

export default router;
