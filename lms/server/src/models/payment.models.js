
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

    // Organization owning the course at purchase time
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      default: null,
      index: true,
    },

    // Course title snapshot at purchase time
    courseTitle: {
      type: String,
      default: null,
      trim: true,
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

// Student payment history
paymentSchema.index({
  student: 1,
  course: 1,
  status: 1,
});

// Organization transaction history
paymentSchema.index({
  organization: 1,
  status: 1,
  verifiedAt: -1,
});

// Course-wise transaction history
paymentSchema.index({
  course: 1,
  status: 1,
  verifiedAt: -1,
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
