
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

    activityType: {
      type: String,
      enum: ["SOLVED", "REVISED"],
      required: true,
    },

    activityAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Student activity timeline
dsaRevisionHistorySchema.index({
  studentId: 1,
  activityAt: -1,
});

// Question-wise activity history
dsaRevisionHistorySchema.index({
  studentId: 1,
  questionId: 1,
  activityAt: -1,
});

const DsaRevisionHistory = mongoose.model(
  "DsaRevisionHistory",
  dsaRevisionHistorySchema
);

export default DsaRevisionHistory;
