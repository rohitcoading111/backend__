import { body, validationResult } from "express-validator";

export const registerValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required")
        .bail()
        .isString()
        .withMessage("Name must be a string")
        .bail(),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Please enter a valid email address")
        .bail(),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 6, max: 50 })
        .withMessage("Password must be between 6 and 50 characters")
        .bail(),
        
    body("role")
    .exists()
    .withMessage("role is required")
    .bail()
    .isIn(["user", "seller"])
    .withMessage("role must be either user or seller")
    .bail(),

    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid request",
                errors: errors.array()
            });
        }

        next();
    }
];

export const loginValidator = [

    body("email")
        .trim()
        .exists().withMessage("email is required")
        .bail()
        .isEmail().withMessage("please enter a valid email address")
        .bail(),

    body("password")
        .isLength({ min: 6, max: 100 })
        .withMessage("password must be between 6 and 100 characters")
        .bail(),
        
    body("role")
    .trim()
    .exists().withMessage("role is required").bail()
    .isIn(["user", "seller"]).withMessage("role must be either user or seller"),
    
    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "invalid request",
                errors: errors.array()
            });
        }

        next();
    }
];