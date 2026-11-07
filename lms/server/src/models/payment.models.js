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

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;