
import { body, validationResult } from "express-validator";

export const forgotPasswordValidator = [
  body("identifier")
    .trim()
    .notEmpty()
    .withMessage("Email or mobile number is required")
    .bail()
    .custom((value) => {
      // Email validation
      if (value.includes("@")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
          throw new Error("Please enter a valid email address");
        }

        return true;
      }

      // Mobile validation: country code required
      const mobileRegex = /^\+[1-9]\d{7,14}$/;

      if (!mobileRegex.test(value)) {
        throw new Error(
          "Please enter a valid mobile number with country code"
        );
      }

      return true;
    }),
];

export const verifyResetOTPValidator = [
  body("identifier")
    .trim()
    .notEmpty()
    .withMessage("Email or mobile number is required")
    .bail()
    .custom((value) => {
      if (value.includes("@")) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      }

      return /^\+[1-9]\d{7,14}$/.test(value);
    })
    .withMessage("Invalid email or mobile number"),

  body("code")
    .isString()
    .withMessage("OTP must be a string")
    .bail()
    .matches(/^\d{6}$/)
    .withMessage("OTP must contain exactly 6 digits"),
];

export const resetPasswordValidator = [
  body("resetToken")
    .isString()
    .withMessage("Reset token is required")
    .bail()
    .matches(/^[a-f0-9]{64}$/i)
    .withMessage("Invalid reset token"),

  body("newPassword")
    .isString()
    .withMessage("New password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("confirmPassword")
    .isString()
    .withMessage("Confirm password is required")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Passwords do not match");
      }

      return true;
    }),
];


export const validateForgotPassword = (req, res, next) => {
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

export const validateVerifyResetOTP = validateForgotPassword;
export const validateResetPassword = validateForgotPassword;