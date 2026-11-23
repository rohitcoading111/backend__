
import mongoose from "mongoose";

const interviewQuestionSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewCategory",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
      default: "BEGINNER",
    },

    tags: {
      type: [String],
      default: [],
    },

    order: {
      type: Number,
      default: 0,
    },

    source: {
      type: String,
      enum: ["SYSTEM", "ADMIN"],
      default: "SYSTEM",
    },

    seedKey: {
      type: String,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

interviewQuestionSchema.index({ categoryId: 1, order: 1 });

interviewQuestionSchema.index({
  categoryId: 1,
  isActive: 1,
  isPublished: 1,
});

const InterviewQuestion = mongoose.model(
  "InterviewQuestion",
  interviewQuestionSchema
);

export default InterviewQuestion;
