import {
  createPaymentRequest,
  getMyPayment,
} from "../services/payment.services.js";

export const createPaymentRequestController = async (req, res) => {
  try {
    const { courseId } = req.body;

    const payment = await createPaymentRequest(
      req.user.id,
      courseId
    );

    return res.status(201).json({
      success: true,
      message: "Payment request created successfully",
      data: {
        paymentId: payment._id,
        course: payment.course,
        amount: payment.amount,
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

    console.error("Create Payment Request Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create payment request",
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