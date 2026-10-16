import express from "express";
import registerUser from "../controllers/auth.controllers.js";
import userValidation from "../validators/auth.validator.js";
import { LoginValidation } from "../validators/auth.validator.js";
import {Login} from "../controllers/auth.controllers.js";
import {RefreshToken} from "../controllers/auth.controllers.js";
import {Logout} from "../controllers/auth.controllers.js";
import { getMe } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminTest } from "../controllers/auth.controllers.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { verifyMobileRegistrationController } from "../controllers/mobileRegistration.controllers.js";
import {
  verifyMobileOTPValidator,
  checkMobileRegistrationValidation,
} from "../validators/mobileRegistration.validator.js";
import { verifyLoginOTPController } from "../controllers/loginOTP.controllers.js";

import {
  verifyEmailRegistrationController,
} from "../controllers/emailRegistration.controllers.js";
import {
  verifyEmailOTPValidator,
  checkEmailOTPValidation,
} from "../validators/emailRegistration.validator.js";

const router = express.Router();


router.post("/register", upload.single("avatar"), userValidation, registerUser);
router.post("/login", LoginValidation, Login);
router.post("/refresh", RefreshToken);
router.post("/logout", Logout);
router.get("/me", authMiddleware, getMe);
router.get( "/admin-test",authMiddleware, roleMiddleware("ADMIN"),adminTest);
router.post(
  "/verify-otp",
  verifyMobileOTPValidator,
  checkMobileRegistrationValidation,
  verifyMobileRegistrationController
);
router.post(
  "/verify-login-otp",
  verifyMobileOTPValidator,
  checkMobileRegistrationValidation,
  verifyLoginOTPController
);

router.post(
  "/verify-email-otp",
  verifyEmailOTPValidator,
  checkEmailOTPValidation,
  verifyEmailRegistrationController
);

export default router;