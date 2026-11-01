
import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

    status: {
      type: String,
      enum: ["ACTIVE", "SUSPENDED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

// One organization per owner admin
organizationSchema.index(
  { owner: 1 },
  { unique: true }
);

// Organization listing and status filtering
organizationSchema.index({
  status: 1,
  createdAt: -1,
});

const Organization = mongoose.model(
  "Organization",
  organizationSchema
);

export default Organization;
