
import { body,validationResult } from "express-validator";

export const createPaymentValidator = [
  body("courseId")
    .notEmpty()
    .withMessage("Course ID is required")
    .isMongoId()
    .withMessage("Invalid course ID"),
];

export const verifyPaymentValidator = [
  body("orderId")
    .notEmpty()
    .withMessage("Order ID is required")
    .isString()
    .withMessage("Order ID must be a string")
    .matches(/^order_[A-Za-z0-9]+$/)
    .withMessage("Invalid Razorpay order ID"),

  body("paymentId")
    .notEmpty()
    .withMessage("Payment ID is required")
    .isString()
    .withMessage("Payment ID must be a string")
    .matches(/^pay_[A-Za-z0-9]+$/)
    .withMessage("Invalid Razorpay payment ID"),

  body("signature")
    .notEmpty()
    .withMessage("Signature is required")
    .isString()
    .withMessage("Signature must be a string")
    .isHexadecimal()
    .isLength({ min: 64, max: 64 })
    .withMessage("Invalid payment signature format"),
];


export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  next();
};
