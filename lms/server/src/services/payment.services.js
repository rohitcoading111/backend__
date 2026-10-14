import razorpay from "../config/razorpay.js";
import Payment from "../models/payment.models.js";
import Course from "../models/course.models.js";
import Enrollment from "../models/enrollment.models.js";
import crypto from "crypto";
import config from "../config/config.js";

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


  
  // Check if an existing payment order is available
  const existingPayment = await Payment.findOne({
    student: studentId,
    course: courseId,
    status: { $in: ["CREATED", "PENDING"] },
  }).sort({ createdAt: -1 });

  // Reuse the existing order if it is still open
  if (existingPayment) {
    const existingOrder = await razorpay.orders.fetch(
      existingPayment.orderId
    );

    if (existingOrder.status === "created") {
      return {
        payment: existingPayment,
        order: existingOrder,
      };
    }
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

  // 1. Find the payment belonging to this student and order
  const payment = await Payment.findOne({
    student: studentId,
    orderId,
  });

  if (!payment) {
    throw new Error("Payment order not found");
  }

  // 2. Verify the Razorpay signature
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

  // 3. Verify the actual payment with Razorpay
  const razorpayPayment = await razorpay.payments.fetch(paymentId);

  if (razorpayPayment.order_id !== orderId) {
    throw new Error("Payment order mismatch");
  }

  if (razorpayPayment.status !== "captured") {
    throw new Error("Payment is not captured");
  }

  if (
    razorpayPayment.amount !== Math.round(payment.amount * 100) ||
    razorpayPayment.currency !== payment.currency
  ) {
    throw new Error("Payment amount or currency mismatch");
  }

  // 4. Handle repeated verification of the same successful payment
  if (payment.status === "PAID") {
    if (payment.razorpayPaymentId !== paymentId) {
      throw new Error("Payment already verified with a different payment");
    }

    const enrollment = await Enrollment.findOne({
      student: payment.student,
      course: payment.course,
    });

    if (!enrollment || enrollment.status !== "ACTIVE") {
      throw new Error(
        "Payment is paid but enrollment is not active; contact support"
      );
    }

    // Return the existing successful result without creating another enrollment
    return { payment, enrollment };
  }

  // 5. Save payment as successful
  payment.razorpayPaymentId = paymentId;
  payment.signatureVerified = true;
  payment.status = "PAID";
  payment.verifiedAt = new Date();

  await payment.save();

  // 6. Activate the student's enrollment
  const enrollment = await Enrollment.findOneAndUpdate(
    {
      student: payment.student,
      course: payment.course,
    },
    {
      $set: {
        status: "ACTIVE",
        paymentId: payment._id.toString(),
        enrolledAt: new Date(),
      },
      $setOnInsert: {
        student: payment.student,
        course: payment.course,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

  return { payment, enrollment };
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