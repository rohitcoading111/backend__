
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
    body("email").trim()
    .exists().withMessage("Email is required").bail()
    .isEmail().withMessage("please enter a valid emil ").bail()
    .normalizeEmail(),

    body("password").trim()
    .exists().withMessage("paassword is required").bail()
    .isString().withMessage("password must be aa string").bail()
    .isLength({ min: 8 }).withMessage("password must be at least 8 characters long").bail(),
    

    (req,res,next)=>{
       const errors = validationResult(req);
       if(!errors.isEmpty()){
        return res.status(400).json({
          message: "validation error",
          errors: errors.array()
        })
       }
       next();
    }


]

export default userValidation;