import { body, validationResult } from "express-validator";

const registerValidator = [
    body("email")
        .trim()
        .exists()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Enter valid email address"),

    body("name")
        .exists()
        .withMessage("Name is required")
        .bail()
        .isString()
        .withMessage("Name must be a string")
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage("Name length should be between 2 to 50 characters"),

    body("password")
        .exists()
        .withMessage("Password is required")
        .bail()
        .isString()
        .withMessage("Password must be a string")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),

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

export default registerValidator;