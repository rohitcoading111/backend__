
import { validationResult } from "express-validator";

import {
  createOrganization,
  getMyOrganization,
} from "../services/organization.services.js";

export const createOrganizationController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const organization = await createOrganization({
      adminId: req.user._id,
      name: req.body.name,
      organizationType: req.body.organizationType,
      description: req.body.description,
      logo: req.body.logo,
    });

    return res.status(201).json({
      success: true,
      message: "Organization created successfully",
      data: organization,
    });
  } catch (error) {
    console.error("Create organization error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to create organization",
    });
  }
};

export const getMyOrganizationController = async (req, res) => {
  try {
    const organization = await getMyOrganization(req.user._id);

    return res.status(200).json({
      success: true,
      message: "Organization fetched successfully",
      data: organization,
    });
  } catch (error) {
    console.error("Get organization error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch organization",
    });
  }
};
