
import mongoose from "mongoose";

const pendingLoginSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Mobile login ke liye
    mobile: {
      type: String,
      trim: true,
      sparse: true,
    },

    // Email login ke liye
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
    },

    // Email OTP ka hashed version
    otpHash: {
      type: String,
      select: false,
    },

    // Galat OTP attempts track karne ke liye
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
  },
  {
    timestamps: true,
  }
);

// Expired pending login records automatically delete honge.
pendingLoginSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const PendingLogin = mongoose.model(
  "PendingLogin",
  pendingLoginSchema
);

export default PendingLogin;
