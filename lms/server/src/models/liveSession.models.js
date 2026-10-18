
import mongoose from "mongoose";

const liveSessionSchema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["LIVE", "ENDED"],
      default: "LIVE",
    },

    roomId: {
      type: String,
      required: true,
      unique: true,
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    endedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const LiveSession = mongoose.model(
  "LiveSession",
  liveSessionSchema
);

export default LiveSession;
