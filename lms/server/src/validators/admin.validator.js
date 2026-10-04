import { body, validationResult } from "express-validator";

export const roleValidation = [
  body("role")
    .exists()
    .withMessage("Role is required")
    .bail()
    .isString()
    .withMessage("Role must be a string")
    .bail()
    .isIn(["STUDENT", "INSTRUCTOR", "ADMIN"])
    .withMessage("Invalid role")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    next();
  },
];