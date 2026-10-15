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

    if (
      error.message === "Invalid or expired OTP" ||
      error.message === "Mobile number and OTP are required" ||
      error.message === "No pending registration found" ||
      error.message === "Registration expired. Please register again" ||
      error.message === "Email or mobile number already exists"
    ) {
      const status =
        error.message === "Email or mobile number already exists"
          ? 409
          : 400;

      return res.status(status).json({
        success: false,
        message: error.message,
      });
    }

    console.error(
      "OTP verification error:",
      error.code || error.name
    );

    return res.status(502).json({
      success: false,
      message: "Unable to verify OTP. Please try again.",
    });
  }
};