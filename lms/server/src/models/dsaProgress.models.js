import mongoose from "mongoose";

const dsaProgressSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DsaQuestion",
      required: true,
    },

    status: {
      type: String,
      enum: ["ATTEMPTED", "SOLVED", "NEEDS_REVISION"],
      default: "ATTEMPTED",
    },

    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },

    firstSolvedAt: {
      type: Date,
      default: null,
    },

    lastAttemptedAt: {
      type: Date,
      default: null,
    },

    lastRevisedAt: {
      type: Date,
      default: null,
    },

    revisionCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    nextRevisionAt: {
      type: Date,
      default: null,
    },

    confidence: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "LOW",
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    isBookmarked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// One progress document per student per question
dsaProgressSchema.index(
  { studentId: 1, questionId: 1 },
  { unique: true }
);

// Find upcoming revision questions
dsaProgressSchema.index({
  studentId: 1,
  nextRevisionAt: 1,
});

const DsaProgress = mongoose.model(
  "DsaProgress",
  dsaProgressSchema
);

export default DsaProgress;
