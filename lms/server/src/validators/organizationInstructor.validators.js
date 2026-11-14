import { param, validationResult } from "express-validator";

// MongoDB User ID validation
export const validateUserId = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid instructor user ID"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];

// MongoDB Instructor ID validation
export const validateInstructorId = [
  param("instructorId")
    .isMongoId()
    .withMessage("Invalid instructor user ID"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];
