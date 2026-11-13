
import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    liveSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LiveSession",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    senderRole: {
      type: String,
      enum: [
        "STUDENT",
        "INSTRUCTOR",
        "ORGANIZATION_ADMIN",
        "SUPER_ADMIN",
      ],
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// Live session wise chat history
chatMessageSchema.index({
  liveSession: 1,
  createdAt: -1,
});

const ChatMessage = mongoose.model(
  "ChatMessage",
  chatMessageSchema
);

export default ChatMessage;
