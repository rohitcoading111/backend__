
import mongoose from "mongoose";

// Temporary registration data ka schema
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
      required: true,
      trim: true,
    },

    // Password ko hash karke hi temporary store karna hai
    password: {
      type: String,
      required: true,
    },

    // Avatar upload hua ho toh uski details
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

    // Pending registration ki expiry
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Expired pending records ko automatically delete karne ka index
pendingRegistrationSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

// Mobile ke liye ek hi pending registration rakho
pendingRegistrationSchema.index(
  { mobile: 1 },
  { unique: true }
);

const PendingRegistration = mongoose.model(
  "PendingRegistration",
  pendingRegistrationSchema
);

export default PendingRegistration;
