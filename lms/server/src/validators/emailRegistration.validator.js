
import { body, validationResult } from "express-validator";

export const verifyEmailOTPValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .bail()
    .matches(/^\d{6}$/)
    .withMessage("OTP must be exactly 6 digits"),

];

export const checkEmailOTPValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};
