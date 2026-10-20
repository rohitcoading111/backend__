
import mongoose from "mongoose";

const passwordResetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Reset OTP kis registered contact par bheja gaya
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
    },

    mobile: {
      type: String,
      trim: true,
      sparse: true,
    },

    // Email OTP ka SHA-256 hash.
    // Mobile OTP Twilio Verify handle karta hai.
    otpHash: {
      type: String,
      select: false,
    },

    otpAttempts: {
      type: Number,
      default: 0,
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
      default: 1,
    },

    lastOtpSentAt: {
      type: Date,
      default: Date.now,
    },

    // OTP verify hone ke baad reset authorization
    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Expired reset records ko MongoDB automatically delete karega.
passwordResetSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const PasswordReset = mongoose.model(
  "PasswordReset",
  passwordResetSchema
);

export default PasswordReset;
