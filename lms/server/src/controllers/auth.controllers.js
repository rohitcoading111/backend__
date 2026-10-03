import { registerUser as registerUserService } from "../services/auth.services.js";
import { LoginUser } from "../services/auth.services.js";
import config from "../config/config.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try {
    const result = await registerUserService(req.body);

    const { accessToken, refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, 
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Register Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const Login = async (req, res) => {
  try {
    const result = await LoginUser(req.body);

    const { accessToken, refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
      },
    });

  } catch (error) {
    if (error.message === "Invalid email or password") {
      return res.status(401).json({
        success: false,
        message: error.message,
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

 

    return res.status(200).json({
      success: true,
      message: "Refresh token verified",
      data: {
        id: decoded.id,
        email: decoded.email,
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

export default registerUser;