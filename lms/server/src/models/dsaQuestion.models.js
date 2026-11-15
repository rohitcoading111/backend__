
import mongoose from "mongoose";

const exampleSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: true,
      trim: true,
    },

    output: {
      type: String,
      required: true,
      trim: true,
    },

    explanation: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const dsaQuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      required: true,
    },

    topics: {
      type: [String],
      required: true,
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one topic is required",
      },
    },

    platform: {
      type: String,
      enum: [
        "LEETCODE",
        "GFG",
        "CODEFORCES",
        "HACKERRANK",
        "OTHER",
      ],
      required: true,
    },

    externalUrl: {
      type: String,
      trim: true,
    },

    examples: {
      type: [exampleSchema],
      default: [],
    },

    constraints: {
      type: [String],
      default: [],
    },

    hints: {
      type: [String],
      default: [],
    },

    companies: {
      type: [String],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const DsaQuestion = mongoose.model( "DsaQuestion",dsaQuestionSchema);

export default DsaQuestion;
