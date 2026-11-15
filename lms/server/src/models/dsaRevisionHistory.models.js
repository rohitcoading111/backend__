
import mongoose from "mongoose";

const dsaRevisionHistorySchema = new mongoose.Schema(
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

    progressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DsaProgress",
      required: true,
    },

    revisedAt: {
      type: Date,
      default: Date.now,
    },

    confidenceBefore: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },

    confidenceAfter: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },

    outcome: {
      type: String,
      enum: ["EASY", "MODERATE", "DIFFICULT"],
      required: true,
    },

    nextRevisionAt: {
      type: Date,
      default: null,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Student-wise revision history
dsaRevisionHistorySchema.index({
  studentId: 1,
  revisedAt: -1,
});

// Question-wise revision history
dsaRevisionHistorySchema.index({
  studentId: 1,
  questionId: 1,
  revisedAt: -1,
});

const DsaRevisionHistory = mongoose.model(
  "DsaRevisionHistory",
  dsaRevisionHistorySchema
);

export default DsaRevisionHistory;
