import { body, validationResult } from "express-validator";

export const imageUploadValidation = [

  body("type")
    .exists()
    .withMessage("Upload type is required")
    .bail()
    .isString()
    .withMessage("Upload type must be a string")
    .bail()
    .isIn(["AVATAR", "COURSE_THUMBNAIL", "COURSE_VIDEO"])
    .withMessage("Invalid upload type")
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