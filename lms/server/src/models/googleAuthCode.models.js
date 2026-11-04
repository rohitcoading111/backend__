import mongoose from "mongoose";

const googleAuthCodeSchema = new mongoose.Schema({
  codeHash: {
    type: String,
    required: true,
    unique: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  googleUser: {
    googleId: String,
    name: String,
    email: String,
    avatar: String,
    emailVerified: Boolean,
  },

  expiresAt: {
    type: Date,
    required: true,
    expires: 0,
  },
});

export default mongoose.model(
  "GoogleAuthCode",
  googleAuthCodeSchema
);