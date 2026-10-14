
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    mobile: {
      type: String,
      trim: true,
      match: /^\+[1-9]\d{7,14}$/,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    role: {
      type: String,
      enum: ["STUDENT", "INSTRUCTOR", "ADMIN"],
      default: "STUDENT",
    },

    avatar: {
      url: {
        type: String,
        default: null,
      },
      fileId: {
        type: String,
        default: null,
      },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// At least one login identifier is required
userSchema.pre("validate", function () {
  if (!this.email && !this.mobile) {
    this.invalidate(
      "email",
      "Email or mobile number is required"
    );
  }
});

// Unique indexes for identifiers when present
userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: { email: { $type: "string" } },
  }
);

userSchema.index(
  { mobile: 1 },
  {
    unique: true,
    partialFilterExpression: { mobile: { $type: "string" } },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
