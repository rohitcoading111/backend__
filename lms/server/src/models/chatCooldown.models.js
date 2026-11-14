import mongoose from "mongoose";

const chatCooldownSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    liveSession: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LiveSession",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

chatCooldownSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

const ChatCooldown = mongoose.model(
  "ChatCooldown",
  chatCooldownSchema
);

export default ChatCooldown;
