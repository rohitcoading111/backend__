
import mongoose from "mongoose";

const organizationBankDetailsSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      unique: true,
    },

    accountHolderName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    bankName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    // AES-256-GCM encrypted account number
    encryptedAccountNumber: {
      type: String,
      required: true,
      select: false,
    },

    // Last four digits for masked display
    accountNumberLast4: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 4,
    },

    ifscCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    },

    accountType: {
      type: String,
      enum: ["SAVINGS", "CURRENT"],
      required: true,
    },

    bankProof: {
      url: {
        type: String,
        default: null,
      },
      fileId: {
        type: String,
        default: null,
      },
    },

    verificationStatus: {
      type: String,
      enum: ["PENDING", "VERIFIED", "REJECTED"],
      default: "PENDING",
      index: true,
    },

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      trim: true,
      maxlength: 500,
      default: null,
    },

    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

organizationBankDetailsSchema.index({
  organization: 1,
  verificationStatus: 1,
});

const OrganizationBankDetails = mongoose.model(
  "OrganizationBankDetails",
  organizationBankDetailsSchema
);

export default OrganizationBankDetails;
