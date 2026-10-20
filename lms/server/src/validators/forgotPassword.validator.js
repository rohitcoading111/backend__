
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
