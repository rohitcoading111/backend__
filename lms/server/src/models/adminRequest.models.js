import mongoose from "mongoose";

const adminRequestSchema = new mongoose.Schema(
  {
    // Person requesting an organization admin account
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },


    emailVerifiedAt: {
    type: Date,
    default: null,
    },

    verificationTokenHash: {
      type: String,
      default: null,
      select: false,
    },

      verificationTokenExpiresAt: {
       type: Date,
        default: null,
        select: false,
      },

    mobile: {
      type: String,
      required: true,
      trim: true,
      match: /^\+[1-9]\d{7,14}$/,
    },

    // Organization details
    organizationName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    organizationType: {
      type: String,
      enum: ["INDIVIDUAL", "COMPANY", "INSTITUTE"],
      required: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },
    password: {
  type: String,
  required: true,
  minlength: 8,
  select: false,
},

    logo: {
      url: {
        type: String,
        default: null,
      },
      fileId: {
        type: String,
        default: null,
      },
    },

    // Request status
    status: {
  type: String,
  enum: ["PENDING", "VERIFIED", "APPROVED", "REJECTED"],
  default: "PENDING",
},

    // Existing Super Admin who reviewed the request
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    reviewedAt: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      trim: true,
      maxlength: 500,
      default: null,
    },

    // Created after approval
    createdAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Efficient Super Admin request filtering
adminRequestSchema.index({
  status: 1,
  createdAt: -1,
});

// Prevent duplicate pending requests for the same email
adminRequestSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: "PENDING",
    },
  }
);

const AdminRequest = mongoose.model(
  "AdminRequest",
  adminRequestSchema
);

export default AdminRequest;
