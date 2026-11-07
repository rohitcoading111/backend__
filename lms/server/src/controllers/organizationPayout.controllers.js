
import { validationResult } from "express-validator";

import {
  submitOrganizationPayout,
} from "../services/organizationPayout.services.js";

export const submitOrganizationPayoutController = async (
  req,
  res
) => {
  try {
    // 1. Validate request body
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    // 2. Get authenticated admin ID
    const adminId = req.user.id || req.user._id;

    if (!adminId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // 3. Pass data to service
    const payout = await submitOrganizationPayout({
      adminId,

      accountHolderName: req.body.accountHolderName,

      accountNumber: req.body.accountNumber,

      confirmAccountNumber: req.body.confirmAccountNumber,

      ifscCode: req.body.ifscCode,

      businessEmail: req.body.businessEmail,

      businessPhone: req.body.businessPhone,
    });

    // 4. Send response
    return res.status(201).json({
      success: true,
      message: "Payout details submitted successfully",
      data: payout,
    });
  } catch (error) {
    console.error(
      "Submit Organization Payout Error:",
      error.message
    );

    return res.status(error.statusCode || 500).json({
      success: false,
      message:
        error.message || "Failed to submit payout details",
    });
  }
};
