import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
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

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "CANCELLED"],
      default: "PENDING",
    },

    paymentId: {
      type: String,
      default: null,
    },

    enrolledAt: {
      type: Date,
      default: null,
    },
    completedLectures: [
   {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lecture",
   },
],
  },
  {
    timestamps: true,
  },
  
);

// Ek student ka ek course mein sirf ek enrollment record
enrollmentSchema.index(
  { student: 1, course: 1 },
  { unique: true }
);

const Enrollment = mongoose.model(
  "Enrollment",
  enrollmentSchema
);

export default Enrollment;