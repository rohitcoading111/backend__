
import { body, validationResult } from "express-validator";

// ==========================================
// COMMON VALIDATION ERROR HANDLER
// ==========================================

export const handleBankDetailsValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Bank details validation failed",
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};

// ==========================================
// CREATE BANK DETAILS VALIDATOR
// ==========================================

export const createBankDetailsValidator = [
  body("accountHolderName")
    .trim()
    .notEmpty()
    .withMessage("Account holder name is required")
    .bail()
    .isLength({ min: 2, max: 150 })
    .withMessage("Account holder name must be between 2 and 150 characters")
    .matches(/^[a-zA-Z\s.'-]+$/)
    .withMessage("Account holder name contains invalid characters"),

  body("bankName")
    .trim()
    .notEmpty()
    .withMessage("Bank name is required")
    .bail()
    .isLength({ min: 2, max: 150 })
    .withMessage("Bank name must be between 2 and 150 characters"),

  body("accountNumber")
    .trim()
    .notEmpty()
    .withMessage("Account number is required")
    .bail()
    .matches(/^\d{9,18}$/)
    .withMessage("Account number must contain 9 to 18 digits"),

  body("confirmAccountNumber")
    .trim()
    .notEmpty()
    .withMessage("Please confirm your account number")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.accountNumber) {
        throw new Error("Account numbers do not match");
      }

      return true;
    }),

  body("ifscCode")
    .trim()
    .notEmpty()
    .withMessage("IFSC code is required")
    .bail()
    .toUpperCase()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .withMessage("Please provide a valid IFSC code"),

  body("accountType")
    .trim()
    .notEmpty()
    .withMessage("Account type is required")
    .bail()
    .isIn(["SAVINGS", "CURRENT"])
    .withMessage("Account type must be SAVINGS or CURRENT"),

  body("bankProof.url")
    .optional({ values: "falsy" })
    .isURL({ require_protocol: true })
    .withMessage("Please provide a valid bank proof URL"),

  body("bankProof.fileId")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Bank proof file ID must be a string"),
];

// ==========================================
// UPDATE BANK DETAILS VALIDATOR
// ==========================================

export const updateBankDetailsValidator = [
  body("accountHolderName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Account holder name cannot be empty")
    .bail()
    .isLength({ min: 2, max: 150 })
    .withMessage("Account holder name must be between 2 and 150 characters")
    .matches(/^[a-zA-Z\s.'-]+$/)
    .withMessage("Account holder name contains invalid characters"),

  body("bankName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Bank name cannot be empty")
    .bail()
    .isLength({ min: 2, max: 150 })
    .withMessage("Bank name must be between 2 and 150 characters"),

  body("accountNumber")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Account number cannot be empty")
    .bail()
    .matches(/^\d{9,18}$/)
    .withMessage("Account number must contain 9 to 18 digits"),

  body("confirmAccountNumber")
    .if(body("accountNumber").exists())
    .trim()
    .notEmpty()
    .withMessage("Please confirm your account number")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.accountNumber) {
        throw new Error("Account numbers do not match");
      }

      return true;
    }),

  body("ifscCode")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("IFSC code cannot be empty")
    .bail()
    .toUpperCase()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/)
    .withMessage("Please provide a valid IFSC code"),

  body("accountType")
    .optional()
    .trim()
    .isIn(["SAVINGS", "CURRENT"])
    .withMessage("Account type must be SAVINGS or CURRENT"),

  body("bankProof.url")
    .optional({ values: "falsy" })
    .isURL({ require_protocol: true })
    .withMessage("Please provide a valid bank proof URL"),

  body("bankProof.fileId")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("Bank proof file ID must be a string"),
];
