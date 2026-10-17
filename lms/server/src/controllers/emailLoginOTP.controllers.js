import { verifyEmailLoginOTP } from "../services/auth.services.js";

export const verifyEmailLoginOTPController = async (req, res) => {
  try {
    const result = await verifyEmailLoginOTP(req.body);

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken: result.accessToken,
        user: result.user,
      },
    });
  } catch (error) {
    if (
      error.message === "Email and a valid 6-digit OTP are required"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message === "LOGIN_SESSION_NOT_FOUND" ||
      error.message === "LOGIN_SESSION_EXPIRED"
    ) {
      return res.status(401).json({
        success: false,
        message: "Login session expired or not found. Please log in again.",
      });
    }

    if (
      error.message === "INVALID_LOGIN_OTP" ||
      error.message === "OTP_ATTEMPTS_EXCEEDED"
    ) {
      return res.status(401).json({
        success: false,
        message:
          error.message === "OTP_ATTEMPTS_EXCEEDED"
            ? "Too many incorrect OTP attempts. Please log in again."
            : "Invalid or expired OTP",
      });
    }

    console.error("Email Login OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
