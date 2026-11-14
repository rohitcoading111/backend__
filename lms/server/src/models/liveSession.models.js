
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
    isChatEnabled: {
     type: Boolean,
     default: true,
  },
    chatCooldownSeconds: {
      type: Number,
      enum: [0, 5, 10, 15, 30, 60, 300],
      default: 0,
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

// Course-wise live session lookup
liveSessionSchema.index({
  course: 1,
  status: 1,
});

// Instructor's live sessions
liveSessionSchema.index({
  instructor: 1,
  status: 1,
});

const LiveSession = mongoose.model(
  "LiveSession",
  liveSessionSchema
);

export default LiveSession;
