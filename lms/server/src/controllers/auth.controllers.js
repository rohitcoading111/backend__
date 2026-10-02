import { registerUser as registerUserService } from "../services/auth.service.js";

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

export default registerUser;