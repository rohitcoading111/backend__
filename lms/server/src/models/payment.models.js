import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
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

    organization: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Organization",
  default: null,
},

razorpayTransferId: {
  type: String,
  default: null,
},

transferStatus: {
  type: String,
  enum: [
    "NOT_REQUIRED",
    "PENDING",
    "CREATED",
    "PROCESSED",
    "FAILED",
    "REVERSED",
  ],
  default: "NOT_REQUIRED",
},

transferAmount: {
  type: Number,
  default: 0,
},

transferError: {
  type: String,
  default: null,
},

transferredAt: {
  type: Date,
  default: null,
},

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    currency: {
      type: String,
      default: "INR",
    },

    status: {
      type: String,
      enum: ["CREATED", "PENDING", "PAID", "FAILED"],
      default: "CREATED",
    },

    provider: {
      type: String,
      enum: ["RAZORPAY"],
      default: "RAZORPAY",
    },

    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
    },

    signatureVerified: {
      type: Boolean,
      default: false,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

paymentSchema.index({ student: 1, course: 1, status: 1 });
paymentSchema.index({
  organization: 1,
  transferStatus: 1,
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;