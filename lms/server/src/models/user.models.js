
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

    password: {
      type: String,
      required: false,
      minlength: 8,
      select: false,
    },

    // User authorization role
    role: {
      type: String,
      enum: ["STUDENT", "INSTRUCTOR", "ADMIN"],
      default: "STUDENT",
    },

    // Account kis purpose ke liye create hua hai
    accountType: {
      type: String,
      enum: ["STUDENT", "BUSINESS"],
      default: "STUDENT",
    },

    // Seller approval status
    sellerStatus: {
      type: String,
      enum: [
        "NOT_APPLIED",
        "PENDING",
        "APPROVED",
        "REJECTED",
      ],
      default: "NOT_APPLIED",
    },

    // Seller / Business information
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

    // Seller agreement acceptance record
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

// At least one identifier is required
userSchema.pre("validate", function () {
  if (!this.email && !this.mobile && !this.googleId) {
    this.invalidate(
      "email",
      "Email, mobile number, or Google account is required"
    );
  }

  // Business account must have instructor role
  if (
    this.accountType === "BUSINESS" &&
    this.role !== "INSTRUCTOR" &&
    this.role !== "ADMIN"
  ) {
    this.invalidate(
      "role",
      "Business accounts must have instructor access"
    );
  }

  // Business account must have an application status
  if (
    this.accountType === "BUSINESS" &&
    this.sellerStatus === "NOT_APPLIED"
  ) {
    this.invalidate(
      "sellerStatus",
      "Business account requires a seller application status"
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

// Useful for admin seller management
userSchema.index({ accountType: 1, sellerStatus: 1 });

const User = mongoose.model("User", userSchema);

export default User;
