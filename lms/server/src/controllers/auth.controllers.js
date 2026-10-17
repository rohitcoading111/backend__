import { registerUser as registerUserService } from "../services/auth.services.js";
import { LoginUser } from "../services/auth.services.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";
import { LogoutUser } from "../services/auth.services.js";
import { refreshTokenService } from "../services/auth.services.js";
import { startMobileRegistration } from "../services/mobileRegistration.services.js";



export const registerUser = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const mobile = req.body.mobile?.trim();

    // At least one identifier is required
    if (!email && !mobile) {
      return res.status(400).json({
        success: false,
        message: "Email or mobile number is required",
      });
    }

    // MOBILE REGISTRATION
    if (mobile) {
      const result = await startMobileRegistration({
        ...req.body,
        email,
        mobile,
        file: req.file,
      });

      return res.status(202).json({
        success: true,
        message: result.message,
        data: {
          mobile: result.mobile,
          otpRequired: true,
        },
      });
    }

    // EMAIL REGISTRATION
    const result = await registerUserService({
      ...req.body,
      email,
      file: req.file,
    });

    return res.status(202).json({
      success: true,
      message: result.message,
      data: {
        email: result.email,
        otpRequired: result.otpRequired,
      },
    });
  } catch (error) {
    // Log the real error for debugging
    console.error("Register Controller Error:", {
      name: error.name,
      message: error.message,
      code: error.code,
      keyValue: error.keyValue,
      stack: error.stack,
    });

    // Duplicate registration / MongoDB unique-index conflict
    if (
      error.message === "User already exists" ||
      error.message === "Email or mobile number already exists" ||
      error.message === "Mobile number is already registered" ||
      error.message?.includes("already pending") ||
      error.code === 11000
    ) {
      return res.status(409).json({
        success: false,
        message: error.message || "Duplicate registration",
      });
    }

    // OTP rate limits
    if (
      error.message ===
        "OTP send limit reached. Please try again later" ||
      error.message === "Please wait before requesting another OTP"
    ) {
      return res.status(429).json({
        success: false,
        message: error.message,
      });
    }

    // Validation errors
    if (
      error.message?.startsWith("Name, mobile") ||
      error.message?.startsWith("Enter mobile number") ||
      error.message === "Email is required for email registration" ||
      error.message === "Email or mobile number is required"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // Email delivery failure
    if (error.message === "EMAIL_OTP_SEND_FAILED") {
      return res.status(502).json({
        success: false,
        message: "Could not send verification email. Please try again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const Login = async (req, res) => {
  try {
    const result = await LoginUser(req.body);

    return res.status(202).json({
      success: true,
      message: result.message,
      data: {
        mobile: result.mobile,
        otpRequired: true,
      },
    });
  } catch (error) {
    if (error.message === "Invalid email or password") {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (error.message === "Email or mobile number is required") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "LOGIN_MOBILE_REQUIRED") {
      return res.status(400).json({
        success: false,
        message: "A registered mobile number is required for OTP login",
      });
    }

    if (error.message === "OTP_COOLDOWN") {
      return res.status(429).json({
        success: false,
        message: "Please wait 60 seconds before requesting another OTP",
      });
    }

    if (error.message === "OTP_RATE_LIMIT") {
      return res.status(429).json({
        success: false,
        message: "OTP limit reached. Please try again later",
      });
    }

    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const RefreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not found",
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET
    );

    const accessToken = await refreshTokenService(
      decoded,
      refreshToken
    );

    return res.status(200).json({
      success: true,
      message: "Refresh token verified",
      data: {
        accessToken,
      },
    });

  } catch (error) {
    console.error("Refresh token error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

export const Logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: "Refresh token not found",
    });
  }

  const logoutuser = await LogoutUser(refreshToken);

  res.clearCookie("refreshToken");

  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Authenticated user",
    data: {
      user: req.user,
    },
  });
};

export const adminTest = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Admin access granted",
    data: {
      user: req.user,
    },
  });
};

// User ke OTP ko verify karne wala controller
export default registerUser;