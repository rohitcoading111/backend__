import mongoose from "mongoose";

const pendingLoginSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
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

// Expired login sessions ko automatically delete karega.
pendingLoginSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const PendingLogin = mongoose.model(
  "PendingLogin",
  pendingLoginSchema
);

export default PendingLogin;
