
import express from "express";

import {
  registerUser,
  Login,
  RefreshToken,
  Logout,
  getMe,
  adminTest,
  forgotPasswordController,
  verifyPasswordResetOTPController,
  resetPasswordController,
} from "../controllers/auth.controllers.js";

import {
  exchangeGoogleAuthCode,
  completeGoogleRegistration,
} from "../controllers/googleAuthControllers.js";

import { googleAuthCallback } from "../controllers/googleAuthControllers.js";

import userValidation, {
  LoginValidation,
} from "../validators/auth.validator.js";

import {
  verifyMobileOTPValidator,
  checkMobileRegistrationValidation,
} from "../validators/mobileRegistration.validator.js";

import {
  verifyEmailOTPValidator,
  checkEmailOTPValidation,
} from "../validators/emailRegistration.validator.js";

import {
  verifyEmailLoginOTPValidator,
  checkEmailLoginOTPValidation,
} from "../validators/emailLoginOTP.validator.js";

import {
  forgotPasswordValidator,
  validateForgotPassword,
  verifyResetOTPValidator,
  validateVerifyResetOTP,
  resetPasswordValidator,
  validateResetPassword,
} from "../validators/forgotPassword.validator.js";

import {
  loginLimiter,
  registerLimiter,
  otpVerificationLimiter,
  forgotPasswordLimiter,
  resetPasswordLimiter,
  googleAuthLimiter,
  googleCallbackLimiter,
  googleRegisterLimiter,
} from "../middleware/authRateLimit.middleware.js";

import { verifyLoginOTPController } from "../controllers/loginOTP.controllers.js";
import { verifyMobileRegistrationController } from "../controllers/mobileRegistration.controllers.js";
import { verifyEmailRegistrationController } from "../controllers/emailRegistration.controllers.js";
import { verifyEmailLoginOTPController } from "../controllers/emailLoginOTP.controllers.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleware.js";

import passport from "../config/googleStrategy.js";

const router = express.Router();

// User registration
router.post(
  "/register",
  registerLimiter,
  upload.single("avatar"),
  userValidation,
  registerUser
);

// User login
router.post(
  "/login",
  loginLimiter,
  LoginValidation,
  Login
);

// Refresh token
router.post("/refresh", RefreshToken);

// Logout
router.post("/logout", Logout);

// Get logged-in user
router.get("/me", authMiddleware, getMe);

// Admin test
router.get(
  "/admin-test",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminTest
);

// Mobile registration OTP verification
router.post(
  "/verify-otp",
  otpVerificationLimiter,
  verifyMobileOTPValidator,
  checkMobileRegistrationValidation,
  verifyMobileRegistrationController
);

// Mobile login OTP verification
router.post(
  "/verify-login-otp",
  otpVerificationLimiter,
  verifyMobileOTPValidator,
  checkMobileRegistrationValidation,
  verifyLoginOTPController
);

// Email registration OTP verification
router.post(
  "/verify-email-otp",
  otpVerificationLimiter,
  verifyEmailOTPValidator,
  checkEmailOTPValidation,
  verifyEmailRegistrationController
);

// Email login OTP verification
router.post(
  "/verify-email-login-otp",
  otpVerificationLimiter,
  verifyEmailLoginOTPValidator,
  checkEmailLoginOTPValidation,
  verifyEmailLoginOTPController
);

// Forgot password
router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  forgotPasswordValidator,
  validateForgotPassword,
  forgotPasswordController
);

// Verify password reset OTP
router.post(
  "/verify-reset-otp",
  otpVerificationLimiter,
  verifyResetOTPValidator,
  validateVerifyResetOTP,
  verifyPasswordResetOTPController
);

// Reset password
router.post(
  "/reset-password",
  resetPasswordLimiter,
  resetPasswordValidator,
  validateResetPassword,
  resetPasswordController
);

// Google OAuth login
router.get(
  "/google",
  googleAuthLimiter,
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Google OAuth callback
router.get(
  "/google/callback",
  googleCallbackLimiter,
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/google/failure",
  }),
  googleAuthCallback
);

// Google login failure
router.get("/google/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Google authentication failed",
  });
});

// Exchange Google authorization code
router.post(
  "/google/exchange",
  googleAuthLimiter,
  exchangeGoogleAuthCode
);

// Google registration
router.post(
  "/google/register",
  googleRegisterLimiter,
  completeGoogleRegistration
);

export default router;
