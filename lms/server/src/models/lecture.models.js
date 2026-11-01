
import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 150,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    video: {
      url: {
        type: String,
        default: null,
      },
      fileId: {
        type: String,
        default: null,
      },
    },

    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
      required: true,
    },

    order: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Efficient module-wise lecture retrieval
lectureSchema.index({
  module: 1,
  order: 1,
});

const Lecture = mongoose.model("Lecture", lectureSchema);

export default Lecture;
