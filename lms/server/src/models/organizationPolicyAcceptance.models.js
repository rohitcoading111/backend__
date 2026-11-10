import mongoose from "mongoose";

const organizationPolicyAcceptanceSchema = new mongoose.Schema(
  {
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    termsVersion: {
      type: String,
      required: true,
      trim: true,
    },
    securityVersion: {
      type: String,
      required: true,
      trim: true,
    },
    acceptedAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: false }
);

organizationPolicyAcceptanceSchema.index(
  { organization: 1, termsVersion: 1, securityVersion: 1 },
  { unique: true }
);

const OrganizationPolicyAcceptance = mongoose.model(
  "OrganizationPolicyAcceptance",
  organizationPolicyAcceptanceSchema
);

export default OrganizationPolicyAcceptance;
