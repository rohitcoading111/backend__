import { body, validationResult } from "express-validator";

const userValidation = [

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
    .trim()
    .exists()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email")
    .bail()
    .normalizeEmail(),

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
    .trim()
    .isURL()
    .withMessage("Avatar must be a valid URL"),


    (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
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