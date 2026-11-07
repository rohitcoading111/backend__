
import mongoose from "mongoose";

const organizationPayoutSchema = new mongoose.Schema(
  {
    // Organization whose payout details are being submitted
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      unique: true,
    },

    // Bank account holder details
    accountHolderName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    // Encrypted bank account number
    // Never store the original account number in plaintext.
    accountNumberEncrypted: {
      type: String,
      required: true,
      select: false,
    },

    // Last four digits for displaying account information
    accountNumberLast4: {
      type: String,
      required: true,
      match: /^\d{4}$/,
    },

    ifscCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    },

    // Organization contact information
    businessEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
    },

    businessPhone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },

    // Payout details submission status
    status: {
      type: String,
      enum: [
        "NOT_SUBMITTED",
        "SUBMITTED",
        "UNDER_REVIEW",
        "VERIFIED",
        "REJECTED",
      ],
      default: "NOT_SUBMITTED",
    },

    rejectionReason: {
      type: String,
      default: null,
      maxlength: 500,
    },

    submittedAt: {
      type: Date,
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// One payout profile per organization
organizationPayoutSchema.index(
  { organization: 1 },
  { unique: true }
);

// Filter payout applications by status
organizationPayoutSchema.index({
  status: 1,
  createdAt: -1,
});

const OrganizationPayout = mongoose.model(
  "OrganizationPayout",
  organizationPayoutSchema
);

export default OrganizationPayout;
