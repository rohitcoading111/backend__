
import { body, validationResult } from "express-validator";

export const verifyEmailLoginOTPValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("A valid email is required")
    .normalizeEmail(),

  body("code")
    .trim()
    .matches(/^\d{6}$/)
    .withMessage("OTP must be exactly 6 digits"),
];

export const checkEmailLoginOTPValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};
