
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import User from "../models/user.models.js";

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // Get access token from socket handshake
    let token = socket.handshake.auth?.token;

    // Support Bearer token format too
    if (!token) {
      const authorization =
        socket.handshake.headers.authorization;

      token = authorization?.split(" ")[1];
    }

    if (!token) {
      return next(new Error("Authentication required"));
    }

    // Verify access token
    const decoded = jwt.verify(
      token,
      config.ACCESS_TOKEN_SECRET
    );

    // Fetch latest user details
    const user = await User.findById(decoded.id).select(
      "_id name email role organizationId instructorCode employmentStatus isVerified accountType"
    );

    if (!user) {
      return next(new Error("User not found"));
    }

    // Attach authenticated user to socket
    socket.user = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      organizationId: user.organizationId
        ? user.organizationId.toString()
        : null,
      instructorCode: user.instructorCode || null,
      employmentStatus: user.employmentStatus || null,
      isVerified: user.isVerified,
      accountType: user.accountType,
    };

    next();

  } catch (error) {
    console.error("Socket authentication error:", error.message);

    next(new Error("Invalid or expired access token"));
  }
};
