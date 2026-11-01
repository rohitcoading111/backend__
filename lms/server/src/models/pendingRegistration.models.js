
import mongoose from "mongoose";

const pendingRegistrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    mobile: {
      type: String,
      trim: true,
      default: undefined,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: undefined,
    },

    password: {
      type: String,
      required: true,
    },

    // Selected registration account type
    accountType: {
      type: String,
      enum: ["STUDENT", "BUSINESS"],
      default: "STUDENT",
    },
    // Selected role during registration
role: {
  type: String,
  enum: ["STUDENT", "INSTRUCTOR"],
  default: "STUDENT",
},

    // Temporary business details
    businessProfile: {
      businessName: {
        type: String,
        trim: true,
        maxlength: 100,
        default: null,
      },

      businessType: {
        type: String,
        enum: ["INDIVIDUAL", "COMPANY", "INSTITUTE"],
        default: null,
      },
    },

    // Agreement accepted during onboarding
    sellerAgreement: {
      version: {
        type: String,
        default: null,
      },

      acceptedAt: {
        type: Date,
        default: null,
      },
    },

    emailOtpHash: {
      type: String,
      default: null,
    },

    avatar: {
      url: {
        type: String,
        default: null,
      },
      fileId: {
        type: String,
        default: null,
      },
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    otpWindowStartedAt: {
      type: Date,
      default: Date.now,
    },

    otpSendCount: {
      type: Number,
      default: 0,
    },

    lastOtpSentAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Automatic pending registration cleanup
pendingRegistrationSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

// Mobile unique only when present
pendingRegistrationSchema.index(
  { mobile: 1 },
  {
    unique: true,
    partialFilterExpression: {
      mobile: { $type: "string" },
    },
  }
);

// Email unique only when present
pendingRegistrationSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $type: "string" },
    },
  }
);

const PendingRegistration = mongoose.model(
  "PendingRegistration",
  pendingRegistrationSchema
);

export default PendingRegistration;
