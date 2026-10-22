import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth.utils.js";
import crypto from "node:crypto";
import GoogleAuthCode from "../models/googleAuthCode.models.js";
import User from "../models/user.models.js";
import { findOrCreateGoogleUser } from "../services/googleAuth.services.js";
import { sendLoginNotification } from "../services/loginNotification.services.js";
import { sendRegistrationNotification } from "../services/registrationNotification.services.js";

export const googleAuthCallback = async (req, res) => {
  try {
    const googleUser = req.user;

    if (!googleUser) {
      return res.status(401).json({
        success: false,
        message: "Google authentication failed",
      });
    }

    const { user, isNewUser } =
      await findOrCreateGoogleUser(googleUser);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    try {
      if (isNewUser) {
        await sendRegistrationNotification({
          email: user.email,
          name: user.name,
        });
      } else {
        await sendLoginNotification({
          email: user.email,
          name: user.name,
          loginMethod: "Google",
        });
      }
    } catch (notificationError) {
      console.error(
        "Google notification failed:",
        notificationError.message
      );
    }

    const rawCode = crypto.randomBytes(32).toString("hex");

const codeHash = crypto
  .createHash("sha256")
  .update(rawCode)
  .digest("hex");

await GoogleAuthCode.create({
  codeHash,
  userId: user._id,
  expiresAt: new Date(Date.now() + 60 * 1000),
});

const frontendUrl =
  process.env.FRONTEND_URL || "http://localhost:5173";

return res.redirect(
  `${frontendUrl}/auth/google/callback?code=${rawCode}`
);

    return res.status(200).json({
      success: true,
      message: isNewUser
        ? "Google registration successful"
        : "Google login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error.message);

    if (
      error.message === "GOOGLE_ACCOUNT_LINK_REQUIRED" ||
      error.message === "ANOTHER_GOOGLE_ACCOUNT_LINKED"
    ) {
      return res.status(409).json({
        success: false,
        message:
          "This account cannot be linked automatically.",
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Account already exists. Please try again.",
      });
    }

    if (error.message === "GOOGLE_ACCOUNT_NOT_VERIFIED") {
      return res.status(401).json({
        success: false,
        message: "Google email verification failed",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

export const exchangeGoogleAuthCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code || typeof code !== "string") {
      return res.status(400).json({
        success: false,
        message: "Authorization code is required",
      });
    }

    const codeHash = crypto
      .createHash("sha256")
      .update(code)
      .digest("hex");

    // Atomically consume the code only once.
    const authCode = await GoogleAuthCode.findOneAndDelete({
      codeHash,
      expiresAt: { $gt: new Date() },
    });

    if (!authCode) {
      return res.status(401).json({
        success: false,
        message: "Authorization code is invalid or expired",
      });
    }

    const user = await User.findById(authCode.userId).select(
      "_id name email role avatar"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const accessToken = generateAccessToken(user);

    return res.status(200).json({
      success: true,
      message: "Google authentication successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error("Google code exchange error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};