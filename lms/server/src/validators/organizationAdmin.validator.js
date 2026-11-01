import { param, validationResult } from "express-validator";

export const suspendOrganizationAdminValidator = [
  param("userId")
    .isMongoId()
    .withMessage("Invalid Organization Admin ID"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    next();
  },
];