import {
  createPaymentRequest,
  getMyPayment,
  verifyPayment
} from "../services/payment.services.js";
import config  from "../config/config.js";


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


;

export const verifyPaymentController = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    // Logged-in student ki ID JWT middleware se milegi
    const studentId = req.user.id;

    const payment = await verifyPayment({
      studentId,
      orderId,
      paymentId,
      signature,
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      data: {
        paymentId: payment._id,
        courseId: payment.course,
        orderId: payment.orderId,
        razorpayPaymentId: payment.razorpayPaymentId,
        status: payment.status,
      },
    });
  } catch (error) {
    if (error.message === "All payment verification fields are required") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message === "Payment order not found" ||
      error.message === "Payment already verified"
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Invalid payment signature") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Payment Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
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