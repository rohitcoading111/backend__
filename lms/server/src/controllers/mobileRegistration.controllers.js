
import { completeMobileRegistration } from "../services/mobileRegistration.services.js";

export const verifyMobileRegistrationController = async (req, res) => {
  try {
    const result = await completeMobileRegistration({
      mobile: req.body.mobile,
      code: req.body.code,
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: result.message,
      data: {
        accessToken: result.accessToken,
        user: result.user,
      },
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email or mobile number already exists",
      });
    }

    const clientErrors = {
      "Invalid or expired OTP": 400,
      "Mobile number and OTP are required": 400,
      "No pending registration found": 404,
      "Registration expired. Please register again": 400,
      "Email or mobile number already exists": 409,
      "INVALID_ROLE": 400,
      "BUSINESS_REGISTRATION_DATA_INVALID": 400,
    };

    const statusCode = clientErrors[error.message];

    if (statusCode) {
      return res.status(statusCode).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Mobile OTP Verification Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify OTP. Please try again.",
    });
  }
};
