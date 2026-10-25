``
import mongoose from "mongoose";

const lessonProgressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lecture",
      required: true,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    completedAt: {
      type: Date,
      default: null,
    },

    timeSpentSeconds: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Ek student ke ek lecture ka sirf ek progress record
lessonProgressSchema.index(
  { student: 1, lecture: 1 },
  { unique: true }
);

const LessonProgress = mongoose.model(
  "LessonProgress",
  lessonProgressSchema
);

export default LessonProgress;
