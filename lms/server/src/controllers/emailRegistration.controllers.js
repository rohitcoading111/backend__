
import { verifyEmailRegistration } from "../services/emailRegistration.services.js";

export const verifyEmailRegistrationController = async (req, res) => {
  try {
    const { email, code } = req.body;

    const result = await verifyEmailRegistration({
      email,
      code,
    });

    // Refresh token ko secure HTTP-only cookie mein set karo
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // User ko bhejne se pehle sensitive fields hatao
    const safeUser = result.user.toObject();

    delete safeUser.password;
    delete safeUser.refreshToken;

    return res.status(200).json({
      success: true,
      message: result.message,
      data: {
        accessToken: result.accessToken,
        user: safeUser,
      },
    });
  } catch (error) {
    const knownErrors = {
      "Email and OTP are required": 400,
      "Registration not found or already completed": 404,
      "OTP expired. Please register again": 400,
      "Invalid OTP": 400,
      "Email already registered": 409,
    };

    const statusCode = knownErrors[error.message] || 500;

    if (statusCode === 500) {
      console.error("Email Verification Error:", error);
    }

    return res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Email verification failed"
          : error.message,
    });
  }
};
