
import { body, validationResult } from "express-validator";

// Mobile registration validation
export const mobileRegistrationValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .matches(/^\+[1-9]\d{7,14}$/)
    .withMessage("Enter mobile with country code, e.g. +919876543210"),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be between 8 and 128 characters"),
];

export const verifyMobileOTPValidator = [
  body("mobile")
    .trim()
    .notEmpty()
    .withMessage("Mobile number is required")
    .matches(/^\+[1-9]\d{7,14}$/)
    .withMessage("Enter a valid mobile number with country code"),

  body("code")
    .trim()
    .notEmpty()
    .withMessage("OTP is required")
    .isLength({ min: 4, max: 10 })
    .withMessage("Enter a valid OTP"),
];


// Validation errors ko response mein bhejna
export const checkMobileRegistrationValidation = (
  req,
  res,
  next
) => {
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
