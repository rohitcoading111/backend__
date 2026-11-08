
import {
  createOrganizationBankDetails,
  updateOrganizationBankDetails,
  getMyOrganizationBankDetails,
  getAllOrganizationsBankDetails,
  getOrganizationBankDetailsById,
  verifyOrganizationBankDetails,
  rejectOrganizationBankDetails,
  uploadOrganizationBankProof,
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

export const uploadBankProofController = async (req, res) => {
  try {
    const bankProof = await uploadOrganizationBankProof(req.file);

    return res.status(200).json({
      success: true,
      message: "Bank proof uploaded successfully",
      data: bankProof,
    });
  } catch (error) {
    console.error("Upload Bank Proof Error:", error);

    return res.status(error.message === "Bank proof file is required" ? 400 : 500).json({
      success: false,
      message: error.message || "Failed to upload bank proof",
    });
  }
};


// ==========================================
// SUPER ADMIN - VERIFY BANK DETAILS
// ==========================================

export const verifyBankDetailsController = async (req, res) => {
  try {
    const { organizationId } = req.params;

    const bankDetails = await verifyOrganizationBankDetails({
      organizationId,
      superAdminId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      message: "Organization bank details verified successfully",
      data: bankDetails,
    });
  } catch (error) {
    const statusCode =
      error.message === "Bank details not found" ? 404 :
      error.message.startsWith("Bank details cannot be verified") ? 409 :
      error.message.startsWith("Invalid") ? 400 : 500;

    console.error("Verify Bank Details Error:", error);

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to verify bank details",
    });
  }
};


// ==========================================
// SUPER ADMIN - REJECT BANK DETAILS
// ==========================================

export const rejectBankDetailsController = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const { rejectionReason } = req.body;

    const bankDetails = await rejectOrganizationBankDetails({
      organizationId,
      superAdminId: req.user.id,
      rejectionReason,
    });

    return res.status(200).json({
      success: true,
      message: "Organization bank details rejected successfully",
      data: bankDetails,
    });
  } catch (error) {
    const statusCode =
      error.message === "Bank details not found" ? 404 :
      error.message.startsWith("Bank details cannot be rejected") ? 409 :
      error.message.startsWith("Invalid") ||
      error.message === "Rejection reason is required" ? 400 : 500;

    console.error("Reject Bank Details Error:", error);

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to reject bank details",
    });
  }
};