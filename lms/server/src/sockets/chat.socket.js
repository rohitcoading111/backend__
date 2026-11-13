
import mongoose from "mongoose";

import LiveSession from "../models/liveSession.models.js";
import Enrollment from "../models/enrollment.models.js";

export const registerChatHandlers = (io, socket) => {

  // Join live class chat room
  socket.on("chat:join", async ({ liveSessionId } = {}) => {
    try {
      // Validate LiveSession ID
      if (!mongoose.Types.ObjectId.isValid(liveSessionId)) {
        return socket.emit("chat:error", {
          message: "Invalid live session ID",
        });
      }

      // Find live session
      const liveSession = await LiveSession.findById(
        liveSessionId
      ).select("course instructor status roomId isChatEnabled");

      if (!liveSession || liveSession.status !== "LIVE") {
        return socket.emit("chat:error", {
          message: "Live session not available",
        });
      }

      // Check instructor authorization
      if (socket.user.role === "INSTRUCTOR") {
        if (
          liveSession.instructor.toString() !== socket.user.id
        ) {
          return socket.emit("chat:error", {
            message: "You are not authorized for this live class",
          });
        }
      }

      // Check student enrollment
      else if (socket.user.role === "STUDENT") {
        const enrollment = await Enrollment.findOne({
          student: socket.user.id,
          course: liveSession.course,
          status: "ACTIVE",
        });

        if (!enrollment) {
          return socket.emit("chat:error", {
            message: "You are not enrolled in this course",
          });
        }
      }

      // Reject all other roles
      else {
        return socket.emit("chat:error", {
          message: "You are not allowed to join this chat",
        });
      }

      // Create a unique room for this live session
      const roomName = `live:${liveSession._id}`;

      // Join socket room
      await socket.join(roomName);

      // Send confirmation
      socket.emit("chat:joined", {
        liveSessionId: liveSession._id,
        roomName,
        isChatEnabled: liveSession.isChatEnabled,
      });

      console.log(
        `${socket.user.name} joined chat room ${roomName}`
      );

    } catch (error) {
      console.error("Chat join error:", error);

      socket.emit("chat:error", {
        message: "Unable to join live chat",
      });
    }
  });
};
