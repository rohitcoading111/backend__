import { body, validationResult } from "express-validator";

export const createInterviewQuestionValidator = [
  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid category ID"),

  body("title")
    .trim()
    .notEmpty()
    .withMessage("Question title is required")
    .isLength({ min: 5, max: 300 })
    .withMessage("Question title must be between 5 and 300 characters"),

  body("answer")
    .trim()
    .notEmpty()
    .withMessage("Answer is required")
    .isLength({ min: 10 })
    .withMessage("Answer must be at least 10 characters long"),

  body("difficulty")
    .optional()
    .isIn(["BEGINNER", "INTERMEDIATE", "ADVANCED"])
    .withMessage("Invalid difficulty level"),

  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array"),

  body("order")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Order must be a non-negative integer"),

  // Validation error handling middleware
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