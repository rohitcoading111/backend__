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

pendingRegistrationSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

pendingRegistrationSchema.index(
  { mobile: 1 },
  {
    unique: true,
    partialFilterExpression: {
      mobile: { $type: "string" },
    },
  }
);

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
