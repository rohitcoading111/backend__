
import {
  createOrganizationBankDetails,
  updateOrganizationBankDetails,
  getMyOrganizationBankDetails,
  getAllOrganizationsBankDetails,
  getOrganizationBankDetailsById,
} from "../services/organizationBankDetails.services.js";

// ==========================================
// ORGANIZATION ADMIN
// CREATE BANK DETAILS
// ==========================================

export const createBankDetailsController = async (req, res) => {
  try {
    const bankDetails = await createOrganizationBankDetails({
      organizationId: req.organizationId,
      adminId: req.user.id,

      accountHolderName: req.body.accountHolderName,
      bankName: req.body.bankName,
      accountNumber: req.body.accountNumber,
      ifscCode: req.body.ifscCode,
      accountType: req.body.accountType,
      bankProof: req.body.bankProof,
    });

    return res.status(201).json({
      success: true,
      message: "Bank details submitted successfully. Verification pending.",
      data: bankDetails,
    });
  } catch (error) {
    if (error.message === "Bank details already exist for this organization") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message === "Organization and Admin ID are required" ||
      error.message === "Invalid Organization or Admin ID"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create Bank Details Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit bank details",
    });
  }
};

// ==========================================
// ORGANIZATION ADMIN
// UPDATE BANK DETAILS
// ==========================================

export const updateBankDetailsController = async (req, res) => {
  try {
    const bankDetails = await updateOrganizationBankDetails({
      organizationId: req.organizationId,
      adminId: req.user.id,

      accountHolderName: req.body.accountHolderName,
      bankName: req.body.bankName,
      accountNumber: req.body.accountNumber,
      ifscCode: req.body.ifscCode,
      accountType: req.body.accountType,
      bankProof: req.body.bankProof,
    });

    return res.status(200).json({
      success: true,
      message: "Bank details updated successfully. Verification is pending again.",
      data: bankDetails,
    });
  } catch (error) {
    if (error.message === "Bank details not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message === "Organization and Admin ID are required" ||
      error.message === "No bank details provided for update"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Update Bank Details Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update bank details",
    });
  }
};

// ==========================================
// ORGANIZATION ADMIN
// GET OWN BANK DETAILS
// ==========================================

export const getMyBankDetailsController = async (req, res) => {
  try {
    const bankDetails = await getMyOrganizationBankDetails(
      req.organizationId
    );

    return res.status(200).json({
      success: true,
      message: bankDetails
        ? "Bank details fetched successfully"
        : "Bank details have not been submitted yet",
      data: bankDetails,
    });
  } catch (error) {
    console.error("Get My Bank Details Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch bank details",
    });
  }
};

// ==========================================
// SUPER ADMIN
// GET ALL ORGANIZATIONS BANK DETAILS
// ==========================================

export const getAllBankDetailsController = async (req, res) => {
  try {
    const bankDetails = await getAllOrganizationsBankDetails();

    return res.status(200).json({
      success: true,
      message: "Organizations bank details fetched successfully",
      data: bankDetails,
    });
  } catch (error) {
    console.error("Get All Bank Details Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch organizations bank details",
    });
  }
};

// ==========================================
// SUPER ADMIN
// GET PARTICULAR ORGANIZATION BANK DETAILS
// ==========================================

export const getOrganizationBankDetailsController = async (
  req,
  res
) => {
  try {
    const { organizationId } = req.params;

    const bankDetails = await getOrganizationBankDetailsById(
      organizationId
    );

    if (!bankDetails) {
      return res.status(404).json({
        success: false,
        message: "Bank details not found for this organization",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Organization bank details fetched successfully",
      data: bankDetails,
    });
  } catch (error) {
    if (
      error.message === "Invalid Organization ID" ||
      error.message === "Organization ID is required"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Get Organization Bank Details Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch organization bank details",
    });
  }
};
