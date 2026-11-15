
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

    solveCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    firstSolvedAt: {
      type: Date,
      default: null,
    },

    lastSolvedAt: {
      type: Date,
      default: null,
    },

    lastRevisedAt: {
      type: Date,
      default: null,
    },

    nextRevisionAt: {
      type: Date,
      default: null,
    },

    isSolved: {
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

// Find questions due for revision
dsaProgressSchema.index({
  studentId: 1,
  nextRevisionAt: 1,
});

const DsaProgress = mongoose.model(
  "DsaProgress",
  dsaProgressSchema
);

export default DsaProgress;
