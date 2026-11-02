import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/user.models.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied, no token provided",
      });
    }

    // Verify access token
    const decoded = jwt.verify(
      token,
      config.ACCESS_TOKEN_SECRET
    );

    // Fetch latest user data
    const user = await User.findById(decoded.id).select(
      "_id name email mobile role avatar adminType adminStatus isVerified accountType instructorCode employmentStatus organizationId hiredBy"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = {
      id: user._id.toString(),

      name: user.name,
      email: user.email,
      mobile: user.mobile,

      role: user.role,
      adminType: user.adminType || null,
      adminStatus: user.adminStatus || null,

      avatar: user.avatar,

      isVerified: user.isVerified,
      accountType: user.accountType,

      instructorCode: user.instructorCode || null,
      employmentStatus: user.employmentStatus || null,

      organizationId: user.organizationId
        ? user.organizationId.toString()
        : null,

      hiredBy: user.hiredBy
        ? user.hiredBy.toString()
        : null,
    };

    next();

  } catch (error) {
    if (
      error.name === "TokenExpiredError" ||
      error.name === "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired access token",
      });
    }

    console.error("Auth middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};