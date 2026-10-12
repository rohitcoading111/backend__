import { param, validationResult } from "express-validator";

export const validateCourseId = [
  param("courseId")
    .isMongoId()
    .withMessage("Invalid course ID"),
];

export const checkEnrollmentValidation = (req, res, next) => {
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