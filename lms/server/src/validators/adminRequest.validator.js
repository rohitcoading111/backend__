
import { body, param } from "express-validator";

export const createAdminRequestValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 }),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),

  body("mobile")
    .trim()
    .matches(/^\+[1-9]\d{7,14}$/)
    .withMessage("Mobile must be in E.164 format"),

  body("organizationName")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required")
    .isLength({ min: 2, max: 150 }),

  body("organizationType")
    .isIn(["INDIVIDUAL", "COMPANY", "INSTITUTE"])
    .withMessage("Invalid organization type"),

  body("description")
    .optional()
    .isString()
    .isLength({ max: 1000 }),

  body("logo")
    .optional()
    .isObject(),

  body("logo.url")
    .optional({ nullable: true })
    .isString(),

  body("logo.fileId")
    .optional({ nullable: true })
    .isString(),
 
  body("password")
  .isString()
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters"),

 body("confirmPassword")
  .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }

    return true;
  }),
];

export const adminRequestIdValidator = [
  param("requestId")
    .isMongoId()
    .withMessage("Invalid request ID"),
];

export const rejectAdminRequestValidator = [
  ...adminRequestIdValidator,

  body("rejectionReason")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Rejection reason cannot exceed 500 characters"),
];
