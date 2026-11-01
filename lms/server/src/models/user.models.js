import mongoose from "mongoose";
import crypto from "crypto";
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
    userCode: {
    type: String,
    unique: true,
     sparse: true,
     immutable: true,
      default: () =>
    `USR-${crypto.randomBytes(8).toString("hex").toUpperCase()}`,
},

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
    instructorCode: {
    type: String,
    unique: true,
    sparse: true,
    immutable: true,
    default: undefined,
},

   role: {
  type: String,
  enum: ["STUDENT", "INSTRUCTOR", "ADMIN"],
  default: "STUDENT",
},

accountType: {
  type: String,
  enum: ["STUDENT", "BUSINESS"],
  default: "STUDENT",
},

adminType: {
  type: String,
  enum: ["SUPER_ADMIN", "ORGANIZATION_ADMIN"],
  default: null,
},

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

    // Organization to which the user belongs
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },

    // Admin who hired this instructor
    hiredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Instructor employment status
    employmentStatus: {
      type: String,
      enum: [
        "INDEPENDENT",
        "ACTIVE",
        "SUSPENDED",
      ],
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

  if (
    this.accountType === "BUSINESS" &&
    this.sellerStatus === "NOT_APPLIED"
  ) {
    this.invalidate(
      "sellerStatus",
      "Business account requires a seller application status"
    );
  }

  if (
    this.role === "INSTRUCTOR" &&
    this.organizationId &&
    !this.hiredBy
  ) {
    this.invalidate(
      "hiredBy",
      "An organization instructor must have a hiring admin"
    );
  }

  if (
    this.role !== "INSTRUCTOR" &&
    (this.organizationId || this.hiredBy)
  ) {
    this.invalidate(
      "organizationId",
      "Only instructors can be assigned to an organization"
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

// Seller management
userSchema.index({ accountType: 1, sellerStatus: 1 });

// Organization instructor management
userSchema.index({
  organizationId: 1,
  role: 1,
  employmentStatus: 1,
});

userSchema.index({ hiredBy: 1 });

const User = mongoose.model("User", userSchema);

export default User;
