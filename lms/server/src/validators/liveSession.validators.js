import { body, param ,validationResult} from "express-validator";

export const createLiveSessionValidator = [
  body("courseId")
    .trim()
    .notEmpty()
    .withMessage("Course ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid course ID"),
];

export const courseIdParamValidator = [
  param("courseId")
    .notEmpty()
    .withMessage("Course ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid course ID"),
];

export const sessionIdParamValidator = [
  param("sessionId")
    .notEmpty()
    .withMessage("Session ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid session ID"),
];

export const roomIdParamValidator = [
  param("roomId")
    .notEmpty()
    .withMessage("Room ID is required")
    .bail()
    .isUUID()
    .withMessage("Invalid room ID"),
];

export const handleValidationErrors = (req, res, next) => {
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