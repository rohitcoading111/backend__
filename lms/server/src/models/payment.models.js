
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

    // Organization receiving the course payment
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
    },

    // Snapshot of the organization's Razorpay Route account
    razorpayLinkedAccountId: {
      type: String,
      default: null,
    },

    // Razorpay Route transfer details
    razorpayTransferId: {
      type: String,
      default: null,
    },

    transferStatus: {
      type: String,
      enum: [
        "NOT_REQUIRED",
        "PENDING",
        "INITIATING",
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
      min: 0,
    },

    transferError: {
      type: String,
      default: null,
    },

    transferredAt: {
      type: Date,
      default: null,
    },

    // Course payment amount
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
  {
    timestamps: true,
  }
);

// Student payment history and status
paymentSchema.index({
  student: 1,
  course: 1,
  status: 1,
});

// Organization transfer tracking
paymentSchema.index({
  organization: 1,
  transferStatus: 1,
});

// Transfer ID lookup
paymentSchema.index({
  razorpayTransferId: 1,
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
