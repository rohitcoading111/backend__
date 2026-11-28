import mongoose from "mongoose";

const softwareFeatureSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },

    label: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const softwarePackageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Basic", "Medium", "Advanced"],
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    features: {
      type: [softwareFeatureSchema],
      default: [],
    },

    price: {
      type: Number,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const SoftwarePackage = mongoose.model(
  "SoftwarePackage",
  softwarePackageSchema
);

export default SoftwarePackage;
