
import { body } from "express-validator";

export const createOrganizationValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Organization name must be between 2 and 150 characters"),

  body("organizationType")
    .notEmpty()
    .withMessage("Organization type is required")
    .isIn(["INDIVIDUAL", "COMPANY", "INSTITUTE"])
    .withMessage("Invalid organization type"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string")
    .isLength({ max: 1000 })
    .withMessage("Description cannot exceed 1000 characters"),

  body("logo")
    .optional()
    .isObject()
    .withMessage("Logo must be an object"),

  body("logo.url")
    .optional({ nullable: true })
    .isString()
    .withMessage("Logo URL must be a string"),

  body("logo.fileId")
    .optional({ nullable: true })
    .isString()
    .withMessage("Logo file ID must be a string"),
];
