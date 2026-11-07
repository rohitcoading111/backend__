
import mongoose from "mongoose";

import OrganizationBankDetails from "../models/organizationBankDetails.models.js";

import {
  encryptBankAccountNumber,
} from "../utils/bankEncryption.js";

// ==========================================
// SAFE RESPONSE FORMAT
// Never expose encrypted account number
// ==========================================

const formatBankDetails = (details) => {
  if (!details) return null;

  return {
    id: details._id,

    organization: details.organization,

    accountHolderName: details.accountHolderName,
    bankName: details.bankName,

    // Only last four digits are exposed
    accountNumber: details.accountNumberLast4
      ? `XXXX XXXX ${details.accountNumberLast4}`
      : null,

    ifscCode: details.ifscCode,
    accountType: details.accountType,

    bankProof: details.bankProof,

    verificationStatus: details.verificationStatus,

    verifiedBy: details.verifiedBy,
    verifiedAt: details.verifiedAt,

    rejectionReason: details.rejectionReason,

    submittedBy: details.submittedBy,
    lastUpdatedBy: details.lastUpdatedBy,

    createdAt: details.createdAt,
    updatedAt: details.updatedAt,
  };
};

// ==========================================
// CREATE ORGANIZATION BANK DETAILS
// ==========================================

export const createOrganizationBankDetails = async ({
  organizationId,
  adminId,
  accountHolderName,
  bankName,
  accountNumber,
  ifscCode,
  accountType,
  bankProof,
}) => {
  if (!organizationId || !adminId) {
    throw new Error("Organization and Admin ID are required");
  }

  if (
    !mongoose.Types.ObjectId.isValid(organizationId) ||
    !mongoose.Types.ObjectId.isValid(adminId)
  ) {
    throw new Error("Invalid Organization or Admin ID");
  }

  const existingDetails = await OrganizationBankDetails.findOne({
    organization: organizationId,
  });

  if (existingDetails) {
    throw new Error("Bank details already exist for this organization");
  }

  const normalizedAccountNumber = accountNumber.replace(/\s/g, "");

  const encryptedAccountNumber = encryptBankAccountNumber(
    normalizedAccountNumber
  );

  const bankDetails = await OrganizationBankDetails.create({
    organization: organizationId,

    accountHolderName,
    bankName,

    encryptedAccountNumber,

    accountNumberLast4: normalizedAccountNumber.slice(-4),

    ifscCode: ifscCode.toUpperCase(),
    accountType,

    bankProof: bankProof || {},

    verificationStatus: "PENDING",

    submittedBy: adminId,
    lastUpdatedBy: adminId,
  });

  return formatBankDetails(bankDetails);
};

// ==========================================
// UPDATE ORGANIZATION BANK DETAILS
// ==========================================

export const updateOrganizationBankDetails = async ({
  organizationId,
  adminId,
  accountHolderName,
  bankName,
  accountNumber,
  ifscCode,
  accountType,
  bankProof,
}) => {
  if (!organizationId || !adminId) {
    throw new Error("Organization and Admin ID are required");
  }

  const bankDetails = await OrganizationBankDetails.findOne({
    organization: organizationId,
  });

  if (!bankDetails) {
    throw new Error("Bank details not found");
  }

  let detailsChanged = false;

  if (accountHolderName !== undefined) {
    bankDetails.accountHolderName = accountHolderName;
    detailsChanged = true;
  }

  if (bankName !== undefined) {
    bankDetails.bankName = bankName;
    detailsChanged = true;
  }

  if (accountNumber !== undefined) {
    const normalizedAccountNumber = accountNumber.replace(/\s/g, "");

    bankDetails.encryptedAccountNumber =
      encryptBankAccountNumber(normalizedAccountNumber);

    bankDetails.accountNumberLast4 =
      normalizedAccountNumber.slice(-4);

    detailsChanged = true;
  }

  if (ifscCode !== undefined) {
    bankDetails.ifscCode = ifscCode.toUpperCase();
    detailsChanged = true;
  }

  if (accountType !== undefined) {
    bankDetails.accountType = accountType;
    detailsChanged = true;
  }

  if (bankProof !== undefined) {
    bankDetails.bankProof = bankProof;
    detailsChanged = true;
  }

  if (!detailsChanged) {
    throw new Error("No bank details provided for update");
  }

  // Any bank detail change requires fresh verification
  bankDetails.verificationStatus = "PENDING";
  bankDetails.verifiedBy = null;
  bankDetails.verifiedAt = null;
  bankDetails.rejectionReason = null;

  bankDetails.lastUpdatedBy = adminId;

  await bankDetails.save();

  return formatBankDetails(bankDetails);
};

// ==========================================
// GET MY ORGANIZATION BANK DETAILS
// ==========================================

export const getMyOrganizationBankDetails = async (
  organizationId
) => {
  if (!organizationId) {
    throw new Error("Organization ID is required");
  }

  const bankDetails = await OrganizationBankDetails.findOne({
    organization: organizationId,
  })
    .populate("organization", "name organizationType")
    .populate("verifiedBy", "name email");

  if (!bankDetails) {
    return null;
  }

  return formatBankDetails(bankDetails);
};

// ==========================================
// SUPER ADMIN
// GET ALL ORGANIZATIONS BANK DETAILS
// ==========================================

export const getAllOrganizationsBankDetails = async () => {
  const bankDetails = await OrganizationBankDetails.find()
    .populate("organization", "name organizationType status")
    .populate("submittedBy", "name email")
    .populate("verifiedBy", "name email")
    .sort({ createdAt: -1 });

  return bankDetails.map(formatBankDetails);
};

// ==========================================
// SUPER ADMIN
// GET PARTICULAR ORGANIZATION BANK DETAILS
// ==========================================

export const getOrganizationBankDetailsById = async (
  organizationId
) => {
  if (!organizationId) {
    throw new Error("Organization ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(organizationId)) {
    throw new Error("Invalid Organization ID");
  }

  const bankDetails = await OrganizationBankDetails.findOne({
    organization: organizationId,
  })
    .populate("organization", "name organizationType status")
    .populate("submittedBy", "name email")
    .populate("verifiedBy", "name email");

  if (!bankDetails) {
    return null;
  }

  return formatBankDetails(bankDetails);
};
