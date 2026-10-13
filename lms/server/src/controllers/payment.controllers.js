import {
  createPaymentRequest,
  getMyPayment,
} from "../services/payment.services.js";
import config  from "../config/config.js";
import crypto from "crypto";

export const createPaymentRequestController = async (req, res) => {
  try {
    const { courseId } = req.body;

    const { payment, order } = await createPaymentRequest(
      req.user.id,
      courseId
    );

    return res.status(201).json({
      success: true,
      message: "Razorpay order created successfully",
      data: {
        paymentId: payment._id,
        courseId: payment.course,
        amount: order.amount,
        currency: order.currency,
        orderId: order.id,
        keyId: config.razorpayKeyId,
        status: payment.status,
      },
    });
  } catch (error) {
    if (error.message === "Course not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message === "Course is not available" ||
      error.message === "You are already enrolled in this course"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Student ID and Course ID are required") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create Razorpay Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create Razorpay order",
    });
  }
};

export const verifyPayment = async ({
  studentId,
  orderId,
  paymentId,
  signature,
}) => {
  if (!studentId || !orderId || !paymentId || !signature) {
    throw new Error("All payment verification fields are required");
  }

  const payment = await Payment.findOne({
    student: studentId,
    orderId,
  });

  if (!payment) {
    throw new Error("Payment order not found");
  }

  if (payment.status === "PAID") {
    throw new Error("Payment already verified");
  }

  // Razorpay payment signature verify karo
  const expectedSignature = crypto
    .createHmac("sha256", config.razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    throw new Error("Invalid payment signature");
  }

  // Signature valid hone par payment record update karo
  payment.razorpayPaymentId = paymentId;
  payment.signatureVerified = true;
  payment.status = "PAID";
  payment.verifiedAt = new Date();

  await payment.save();

  return payment;
};

export const getMyPaymentController = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await getMyPayment(req.user.id, paymentId);

    return res.status(200).json({
      success: true,
      message: "Payment details fetched successfully",
      data: {
        paymentId: payment._id,
        course: payment.course,
        amount: payment.amount,
        status: payment.status,
        transactionReference: payment.transactionReference,
      },
    });
  } catch (error) {
    if (error.message === "Payment not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Student ID and Payment ID are required") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Get Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment details",
    });
  }
};