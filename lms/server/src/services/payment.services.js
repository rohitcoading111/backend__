import razorpay from "../config/razorpay.js";
import Payment from "../models/payment.models.js";
import Course from "../models/course.models.js";
import Enrollment from "../models/enrollment.models.js";
import crypto from "crypto";

export const createPaymentRequest = async (studentId, courseId) => {
  if (!studentId || !courseId) {
    throw new Error("Student ID and Course ID are required");
  }

  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  if (course.status !== "PUBLISHED") {
    throw new Error("Course is not available");
  }

  const existingEnrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
    status: "ACTIVE",
  });

  if (existingEnrollment) {
    throw new Error("You are already enrolled in this course");
  }

  // Razorpay ke liye amount paise mein hoga
  const amountInPaise = Math.round(course.price * 100);

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt: `course_${course._id}_${Date.now()}`,
  });

  // Order ko apne database mein save karo
  const payment = await Payment.create({
    student: studentId,
    course: course._id,
    amount: course.price,
    currency: "INR",
    status: "CREATED",
    provider: "RAZORPAY",
    orderId: order.id,
  });

  return {
    payment,
    order,
  };
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


export const getMyPayment = async (studentId, paymentId) => {
  if (!studentId || !paymentId) {
    throw new Error("Student ID and Payment ID are required");
  }

  const payment = await Payment.findOne({
    _id: paymentId,
    student: studentId,
  }).populate("course", "title thumbnail price");

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};