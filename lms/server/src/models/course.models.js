
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    thumbnail: {
      url: {
        type: String,
        required: true,
      },

      fileId: {
        type: String,
        required: true,
      },
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Organization that owns/manages this course
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: ["BEGINNER", "INTERMEDIATE", "ADVANCED"],
      default: "BEGINNER",
    },

    status: {
      type: String,
      enum: ["DRAFT", "PUBLISHED"],
      default: "DRAFT",
    },
  },
  {
    timestamps: true,
  }
);

// Instructor's courses
courseSchema.index({
  instructor: 1,
  createdAt: -1,
});

// Organization's courses
courseSchema.index({
  organizationId: 1,
  status: 1,
  createdAt: -1,
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
