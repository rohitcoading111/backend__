import mongoose from "mongoose";

const projectInquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    projectType: {
      type: String,
      enum: ["custom"],
      default: "custom",
    },

    requirements: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    budget: {
      type: String,
      default: "",
    },

    timeline: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Pending", "Contacted", "In Discussion", "Completed", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const ProjectInquiry = mongoose.model(
  "ProjectInquiry",
  projectInquirySchema
);

export default ProjectInquiry;