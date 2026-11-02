
import { verifyLoginOTP } from "../services/auth.services.js";
import { setRefreshCookie } from "../utils/refreshCookie.js";

export const verifyLoginOTPController = async (req, res) => {
  try {
    const result = await verifyLoginOTP(req.body);

    setRefreshCookie(res, result.refreshToken);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken: result.accessToken,
        user: result.user,
      },
    });
  } catch (error) {
    if (error.message === "Mobile and OTP are required") {
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

    if (error.message === "INVALID_LOGIN_OTP") {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    console.error("Login OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
