
import razorpay from "../config/razorpay.js";
import Payment from "../models/payment.models.js";
import Course from "../models/course.models.js";
import Organization from "../models/organization.models.js";
import Enrollment from "../models/enrollment.models.js";
import crypto from "crypto";
import config from "../config/config.js";

// Create payment request
export const createPaymentRequest = async (studentId, courseId) => {
  if (!studentId || !courseId) {
    throw new Error("Student ID and Course ID are required");
  }

  // 1. Find course
  const course = await Course.findById(courseId);

  if (!course) {
    throw new Error("Course not found");
  }

  if (course.status !== "PUBLISHED") {
    throw new Error("Course is not available");
  }

  // 2. Course must belong to an organization
  if (!course.organizationId) {
    throw new Error(
      "This course is not linked to an organization"
    );
  }

  // 3. Find course-owning organization
  const organization = await Organization.findById(
    course.organizationId
  );

  if (!organization) {
    throw new Error("Course organization not found");
  }

  if (organization.status !== "ACTIVE") {
    throw new Error("This organization is currently inactive");
  }

  // 4. Verify Razorpay Route linked account
  if (!organization.razorpay?.linkedAccountId) {
    throw new Error(
      "Organization has not completed Razorpay account setup"
    );
  }

  if (organization.razorpay.accountStatus !== "ACTIVATED") {
    throw new Error(
      "Organization Razorpay account is not activated"
    );
  }

  // 5. Check existing active enrollment
  const existingEnrollment = await Enrollment.findOne({
    student: studentId,
    course: courseId,
    status: "ACTIVE",
  });

  if (existingEnrollment) {
    throw new Error("You are already enrolled in this course");
  }

  // 6. Reuse an existing pending order if available
  const existingPayment = await Payment.findOne({
    student: studentId,
    course: courseId,
    status: { $in: ["CREATED", "PENDING"] },
  }).sort({ createdAt: -1 });

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

  // 7. Create Razorpay order
  const amountInPaise = Math.round(course.price * 100);

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt: `course_${course._id}_${Date.now()}`,
  });

  // 8. Save payment with organization snapshot
  const payment = await Payment.create({
    student: studentId,
    course: course._id,
    organization: organization._id,
    razorpayLinkedAccountId:
      organization.razorpay.linkedAccountId,
    amount: course.price,
    currency: "INR",
    status: "CREATED",
    provider: "RAZORPAY",
    orderId: order.id,
  });

  return { payment, order };
};

// Verify payment
export const verifyPayment = async ({
  studentId,
  orderId,
  paymentId,
  signature,
}) => {
  if (!studentId || !orderId || !paymentId || !signature) {
    throw new Error("All payment verification fields are required");
  }

  // 1. Find payment
  const payment = await Payment.findOne({
    student: studentId,
    orderId,
  });

  if (!payment) {
    throw new Error("Payment order not found");
  }

  // 2. Verify Razorpay signature
  const expectedSignature = crypto
    .createHmac("sha256", config.razorpayKeySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  const signatureBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expectedSignature, "hex");

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(
      signatureBuffer,
      expectedBuffer
    )
  ) {
    throw new Error("Invalid payment signature");
  }

  // 3. Fetch payment from Razorpay
  const razorpayPayment = await razorpay.payments.fetch(
    paymentId
  );

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

  // 4. Handle already verified payment
  if (payment.status === "PAID") {
    if (payment.razorpayPaymentId !== paymentId) {
      throw new Error(
        "Payment already verified with a different payment"
      );
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

    return { payment, enrollment };
  }

  // 5. Mark payment as paid
  payment.razorpayPaymentId = paymentId;
  payment.signatureVerified = true;
  payment.status = "PAID";
  payment.verifiedAt = new Date();

  await payment.save();

  // 6. Activate enrollment
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

// Get student's payment
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
