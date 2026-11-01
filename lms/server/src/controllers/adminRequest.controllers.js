
import { validationResult } from "express-validator";

import {
  createAdminRequest,
  getPendingAdminRequests,
  verifyAdminRequestById,
  approveAdminRequest,
  rejectAdminRequest,
  getAdminRequestEmailApprovalDetails,
  approveAdminRequestByEmailToken,
} from "../services/adminRequest.services.js";

// Escape dynamic values before inserting them into HTML
const escapeHtml = (value = "") => {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
};


// 1. Create Admin Request
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


// 2. Get Pending and Verified Requests
export const getPendingAdminRequestsController = async (req, res) => {
  try {
    const requests = await getPendingAdminRequests();

    return res.status(200).json({
      success: true,
      data: { requests },
    });
  } catch (error) {
    console.error("Get Admin Requests Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch admin requests",
    });
  }
};


// 3. Verify Request from Super Admin Panel
export const verifyAdminRequestController = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: errors.array(),
      });
    }

    const request = await verifyAdminRequestById({
      requestId: req.params.requestId,
    });

    return res.status(200).json({
      success: true,
      message: "Admin request verified successfully",
      data: { request },
    });
  } catch (error) {
    console.error("Verify Admin Request Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Request verification failed",
    });
  }
};


// 4. Approve Request from Super Admin Panel
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
      superAdminId: req.user.id,
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


// 5. Reject Request from Super Admin Panel
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
      superAdminId: req.user.id,
      rejectionReason: req.body.rejectionReason,
    });

    return res.status(200).json({
      success: true,
      message: "Admin request rejected successfully",
      data: { request },
    });
  } catch (error) {
    console.error("Reject Admin Request Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to reject admin request",
    });
  }
};


// 6. Open Email Approval Confirmation Page
export const verifyAdminRequestEmailController = async (req, res) => {
  try {
    const token = req.params.token;

    const request = await getAdminRequestEmailApprovalDetails(token);

    const actionUrl =
      `${req.baseUrl}/approve-email/${encodeURIComponent(token)}`;

    return res.status(200).type("html").send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Review Admin Request</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>

        <body style="
          font-family:Arial,sans-serif;
          text-align:center;
          padding:50px 20px;
          background:#f8fafc;
        ">
          <div style="
            max-width:500px;
            margin:auto;
            padding:30px;
            background:white;
            border-radius:12px;
          ">
            <h2>Organization Admin Approval</h2>

            <p><strong>Name:</strong> ${escapeHtml(request.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(request.email)}</p>
            <p><strong>Organization:</strong> ${escapeHtml(request.organizationName)}</p>
            <p><strong>Type:</strong> ${escapeHtml(request.organizationType)}</p>

            <p>Please confirm whether you want to approve this request.</p>

            <form action="${actionUrl}" method="POST">
              <button
                type="submit"
                style="
                  background:#16a34a;
                  color:white;
                  border:0;
                  padding:14px 28px;
                  border-radius:6px;
                  font-size:16px;
                  cursor:pointer;
                "
              >
                Confirm Approval
              </button>
            </form>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Email Approval Page Error:", error);

    return res.status(error.statusCode || 500).type("html").send(`
      <h2>Approval Link Error</h2>
      <p>${escapeHtml(error.message || "Unable to open approval page")}</p>
    `);
  }
};


// 7. Actually Approve Request from Email Confirmation
export const approveAdminRequestByEmailController = async (req, res) => {
  try {
    const result = await approveAdminRequestByEmailToken(
      req.params.token
    );

    return res.status(200).type("html").send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Approval Successful</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>

        <body style="
          font-family:Arial,sans-serif;
          text-align:center;
          padding:50px 20px;
        ">
          <h2 style="color:#16a34a">
            Organization Approved Successfully!
          </h2>

          <p>Admin account has been created successfully.</p>
          <p><strong>Organization:</strong> ${escapeHtml(result.organization.name)}</p>
          <p>You can close this page now.</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error("Email Approval Error:", error);

    return res.status(error.statusCode || 500).type("html").send(`
      <h2>Approval Failed</h2>
      <p>${escapeHtml(error.message || "Unable to approve request")}</p>
    `);
  }
};
