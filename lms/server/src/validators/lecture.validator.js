import { body, param, validationResult } from "express-validator";

export const validateLecture = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Lecture title is required")
    .isLength({ max: 150 })
    .withMessage("Lecture title cannot exceed 150 characters"),

  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be text")
    .isLength({ max: 5000 })
    .withMessage("Notes cannot exceed 5000 characters"),

  body("order")
    .notEmpty()
    .withMessage("Lecture order is required")
    .isInt({ min: 1 })
    .withMessage("Lecture order must be a positive integer")
    .toInt(),
];

export const validateLectureId = [
  param("lectureId")
    .isMongoId()
    .withMessage("Invalid lecture ID"),
];

export const validateModuleId = [
  param("moduleId")
    .isMongoId()
    .withMessage("Invalid module ID"),
];

export const checkValidation = (req, res, next) => {
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