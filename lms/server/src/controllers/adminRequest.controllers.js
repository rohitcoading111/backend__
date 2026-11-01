
import { validationResult } from "express-validator";

import {
  createAdminRequest,
  getPendingAdminRequests,
  approveAdminRequest,
  rejectAdminRequest,
} from "../services/adminRequest.services.js";


export const createAdminRequestController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const request = await createAdminRequest(req.body);

    return res.status(201).json({
      success: true,
      message: "Admin request submitted successfully",
      data: {
        requestId: request._id,
        status: request.status,
      },
    });
  } catch (error) {
    console.error("Create Admin Request Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to submit admin request",
    });
  }
};


export const getPendingAdminRequestsController = async (req, res) => {
  try {
    const requests = await getPendingAdminRequests();

    return res.status(200).json({
      success: true,
      data: { requests },
    });
  } catch (error) {
    console.error("Get Admin Requests Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin requests",
    });
  }
};


export const approveAdminRequestController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const result = await approveAdminRequest({
      requestId: req.params.requestId,
      superAdminId: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Admin account and organization created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Approve Admin Request Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to approve admin request",
    });
  }
};


export const rejectAdminRequestController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const request = await rejectAdminRequest({
      requestId: req.params.requestId,
      superAdminId: req.user._id,
      rejectionReason: req.body.rejectionReason,
    });

    return res.status(200).json({
      success: true,
      message: "Admin request rejected successfully",
      data: request,
    });
  } catch (error) {
    console.error("Reject Admin Request Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to reject admin request",
    });
  }
};
