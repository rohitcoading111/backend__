import {body} from "express-validator"

import { body, validationResult } from "express-validator";

export const productValidation = [

    body("name")
        .trim()
        .exists()
        .withMessage("name is required")
        .bail()
        .isString()
        .withMessage("name must be a string")
        .bail()
        .notEmpty()
        .withMessage("name cannot be an empty value")
        .bail(),

    body("description")
        .trim()
        .exists()
        .withMessage("description is required")
        .bail()
        .isString()
        .withMessage("description must be a string")
        .bail()
        .notEmpty()
        .withMessage("description cannot be an empty value")
        .bail()
        .isLength({ min: 10 })
        .withMessage("description must be at least 10 characters")
        .bail(),

    body("price")
        .exists()
        .withMessage("price is required")
        .bail()
        .isNumeric()
        .withMessage("price must be a number")
        .bail()
        .custom((value) => value > 0)
        .withMessage("price must be greater than 0")
        .bail(),

    body("category")
        .trim()
        .exists()
        .withMessage("category is required")
        .bail()
        .isString()
        .withMessage("category must be a string")
        .bail()
        .notEmpty()
        .withMessage("category cannot be an empty value")
        .bail(),

    body("stock")
        .exists()
        .withMessage("stock is required")
        .bail()
        .isInt({ min: 0 })
        .withMessage("stock must be 0 or greater")
        .bail(),

    body("image")
        .trim()
        .exists()
        .withMessage("image is required")
        .bail()
        .isString()
        .withMessage("image must be a string")
        .bail()
        .notEmpty()
        .withMessage("image cannot be an empty value")
        .bail(),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Invalid product data",
                errors: errors.array()
            });
        }

        next();
    }
];