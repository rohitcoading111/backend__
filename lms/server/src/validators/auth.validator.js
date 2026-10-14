
import { body, validationResult } from "express-validator";

export const userValidation = [
  body("name")
    .trim()
    .exists()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string")
    .bail()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters")
    .bail(),

  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .bail()
    .normalizeEmail(),

  body("mobile")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+[1-9]\d{7,14}$/)
    .withMessage("Enter a valid mobile number with country code"),

  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .bail(),

  body("avatar")
    .optional({ checkFalsy: true })
    .isObject()
    .withMessage("Avatar must be an object")
    .bail(),

  body("avatar.url")
    .if(body("avatar").exists())
    .exists()
    .withMessage("Avatar URL is required")
    .bail()
    .isURL()
    .withMessage("Avatar URL must be a valid URL")
    .bail(),

  body("avatar.fileId")
    .if(body("avatar").exists())
    .exists()
    .withMessage("Avatar fileId is required")
    .bail()
    .isString()
    .withMessage("Avatar fileId must be a string")
    .bail()
    .notEmpty()
    .withMessage("Avatar fileId cannot be empty"),

  // At least one identifier must be provided
  (req, res, next) => {
    if (!req.body.email && !req.body.mobile) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile number is required",
      });
    }

    next();
  },

  // Return all validation errors
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    next();
  },
];

export const LoginValidation = [
  // 1. Email is optional, but if provided, it must be valid
  body("email")
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email")
    .bail()
    .normalizeEmail(),

  // 2. Mobile is optional, but if provided, it must be valid
  body("mobile")
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^\+[1-9]\d{7,14}$/)
    .withMessage("Enter a valid mobile number with country code"),

  // 3. Password is required
  body("password")
    .exists()
    .withMessage("Password is required")
    .bail()
    .isString()
    .withMessage("Password must be a string")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  // 4. Check validation errors and require email OR mobile
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors.array(),
      });
    }

    // At least one login identifier must be provided
    if (!req.body.email?.trim() && !req.body.mobile?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile number is required",
      });
    }

    next();
  },
];

export default userValidation;