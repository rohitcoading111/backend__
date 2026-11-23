import mongoose from "mongoose";

const interviewProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewQuestion",
      required: true,
    },

    status: {
      type: String,
      enum: ["COMPLETED"],
      default: "COMPLETED",
    },

    completedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

interviewProgressSchema.index(
  { userId: 1, questionId: 1 },
  { unique: true }
);

interviewProgressSchema.index({ userId: 1, completedAt: -1 });

const InterviewProgress = mongoose.model(
  "InterviewProgress",
  interviewProgressSchema
);

export default InterviewProgress;
