
import { body } from "express-validator";

export const submitOrganizationPayoutValidator = [
  body("accountHolderName")
    .trim()
    .notEmpty()
    .withMessage("Account holder name is required")
    .bail()
    .isLength({ min: 2, max: 150 })
    .withMessage("Account holder name must be between 2 and 150 characters")
    .matches(/^[a-zA-Z\s.'-]+$/)
    .withMessage("Account holder name contains invalid characters"),

  body("accountNumber")
    .trim()
    .notEmpty()
    .withMessage("Bank account number is required")
    .bail()
    .isNumeric()
    .withMessage("Bank account number must contain only digits")
    .bail()
    .isLength({ min: 9, max: 18 })
    .withMessage("Bank account number must be between 9 and 18 digits"),

  body("confirmAccountNumber")
    .trim()
    .notEmpty()
    .withMessage("Please confirm your bank account number")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.accountNumber) {
        throw new Error("Bank account numbers do not match");
      }

      return true;
    }),

  body("ifscCode")
    .trim()
    .notEmpty()
    .withMessage("IFSC code is required")
    .bail()
    .isLength({ min: 11, max: 11 })
    .withMessage("IFSC code must contain exactly 11 characters")
    .bail()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/i)
    .withMessage("Please enter a valid IFSC code"),

  body("businessEmail")
    .trim()
    .notEmpty()
    .withMessage("Business email is required")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid business email")
    .normalizeEmail(),

  body("businessPhone")
    .trim()
    .notEmpty()
    .withMessage("Business phone number is required")
    .bail()
    .matches(/^\+?[0-9]{10,15}$/)
    .withMessage("Please enter a valid phone number"),
];
