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
import { setRefreshCookie } from "../utils/refreshCookie.js";

export const googleAuthCallback = async (req, res) => {
  try {
    const googleUser = req.user;

    if (!googleUser) {
      return res.status(401).json({
        success: false,
        message: "Google authentication failed",
      });
    }

    const { user, isNewUser } = await findOrCreateGoogleUser(
      googleUser,
      { createIfMissing: false }
    );

    if (!user) {
      const rawCode = crypto.randomBytes(32).toString("hex");
      const codeHash = crypto
        .createHash("sha256")
        .update(rawCode)
        .digest("hex");

      await GoogleAuthCode.create({
        codeHash,
        googleUser: {
          googleId: googleUser.googleId,
          name: googleUser.name,
          email: googleUser.email,
          avatar: googleUser.avatar,
          emailVerified: googleUser.emailVerified,
        },
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      });

      const frontendUrl =
        process.env.FRONTEND_URL || "http://localhost:5173";

      return res.redirect(
        `${frontendUrl}/auth/google/callback?code=${rawCode}&registration=1`
      );
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    setRefreshCookie(res, refreshToken);

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

export const completeGoogleRegistration = async (req, res) => {
  try {
    const { code, role } = req.body;

    if (
      typeof code !== "string" ||
      !["STUDENT", "INSTRUCTOR"].includes(
        String(role).trim().toUpperCase()
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "Authorization code and a valid role are required",
      });
    }

    const codeHash = crypto
      .createHash("sha256")
      .update(code)
      .digest("hex");

    const authCode = await GoogleAuthCode.findOneAndDelete({
      codeHash,
      userId: { $exists: false },
      expiresAt: { $gt: new Date() },
    });

    if (!authCode?.googleUser?.googleId || !authCode.googleUser.email) {
      return res.status(401).json({
        success: false,
        message: "Google registration session is invalid or expired",
      });
    }

    const { user, isNewUser } = await findOrCreateGoogleUser(
      authCode.googleUser,
      { role: String(role).trim().toUpperCase() }
    );

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();
    setRefreshCookie(res, refreshToken);

    if (isNewUser) {
      try {
        await sendRegistrationNotification({
          email: user.email,
          name: user.name,
        });
      } catch (notificationError) {
        console.error(
          "Google registration notification failed:",
          notificationError.message
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Google registration successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          instructorCode: user.instructorCode || null,
          adminType: user.adminType,
          organizationId: user.organizationId,
          hiredBy: user.hiredBy,
          employmentStatus: user.employmentStatus,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error("Google registration error:", error.message);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Account already exists. Please try Google login again.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Google registration failed",
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
      "_id name email role avatar instructorCode adminType organizationId hiredBy employmentStatus"
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
          instructorCode: user.instructorCode || null,
          adminType: user.adminType,
          organizationId: user.organizationId,
          hiredBy: user.hiredBy,
          employmentStatus: user.employmentStatus,
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