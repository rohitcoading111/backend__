
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    // Google account ki unique identity
    googleId: {
      type: String,
      default: undefined,
    },

    mobile: {
      type: String,
      trim: true,
      match: /^\+[1-9]\d{7,14}$/,
    },

    // Google users ke paas local password zaroori nahi
    password: {
      type: String,
      required: false,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      enum: ["STUDENT", "INSTRUCTOR", "ADMIN"],
      default: "STUDENT",
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

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },

    mobileVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Har user ke paas email, mobile ya Google ID honi chahiye
userSchema.pre("validate", function () {
  if (!this.email && !this.mobile && !this.googleId) {
    this.invalidate(
      "email",
      "Email, mobile number, or Google account is required"
    );
  }
});

// Email unique only when present
userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $type: "string" },
    },
  }
);

// Mobile unique only when present
userSchema.index(
  { mobile: 1 },
  {
    unique: true,
    partialFilterExpression: {
      mobile: { $type: "string" },
    },
  }
);

// Google ID unique only when present
userSchema.index(
  { googleId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      googleId: { $type: "string" },
    },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
