import mongoose from "mongoose";
import LiveSession from "../models/liveSession.models.js";
import Enrollment from "../models/enrollment.models.js";
import ChatMessage from "../models/chatMessage.models.js";

export const registerChatHandlers = (io, socket) => {
  // Join live chat room
  socket.on("chat:join", async ({ liveSessionId } = {}) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(liveSessionId)) {
        return socket.emit("chat:error", {
          message: "Invalid live session ID",
        });
      }

      const liveSession = await LiveSession.findById(liveSessionId)
        .select("course instructor status isChatEnabled");

      if (!liveSession || liveSession.status !== "LIVE") {
        return socket.emit("chat:error", {
          message: "Live session not available",
        });
      }

      if (socket.user.role === "INSTRUCTOR") {
        if (liveSession.instructor.toString() !== socket.user.id) {
          return socket.emit("chat:error", {
            message: "You are not authorized for this live class",
          });
        }
      } else if (socket.user.role === "STUDENT") {
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
      } else {
        return socket.emit("chat:error", {
          message: "You are not allowed to join this chat",
        });
      }

      const roomName = `live:${liveSession._id}`;

      await socket.join(roomName);

      socket.emit("chat:joined", {
        liveSessionId: liveSession._id,
        roomName,
        isChatEnabled: liveSession.isChatEnabled,
      });

      console.log(`${socket.user.name} joined ${roomName}`);
    } catch (error) {
      console.error("Chat join error:", error);
      socket.emit("chat:error", {
        message: "Unable to join live chat",
      });
    }
  });

  // Send chat message
  socket.on("chat:send", async ({ liveSessionId, message } = {}) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(liveSessionId)) {
        return socket.emit("chat:error", {
          message: "Invalid live session ID",
        });
      }

      if (typeof message !== "string" || !message.trim()) {
        return socket.emit("chat:error", {
          message: "Message cannot be empty",
        });
      }

      if (message.trim().length > 1000) {
        return socket.emit("chat:error", {
          message: "Message cannot exceed 1000 characters",
        });
      }

      const roomName = `live:${liveSessionId}`;

      // User must already be a member of this room
      if (!socket.rooms.has(roomName)) {
        return socket.emit("chat:error", {
          message: "Join the live chat first",
        });
      }

      const liveSession = await LiveSession.findById(liveSessionId)
        .select("course instructor status isChatEnabled");

      if (!liveSession || liveSession.status !== "LIVE") {
        return socket.emit("chat:error", {
          message: "Live session has ended or is unavailable",
        });
      }

      if (!liveSession.isChatEnabled) {
        return socket.emit("chat:error", {
          message: "Chat is currently paused by the instructor",
        });
      }

      // Verify current authorization again
      if (socket.user.role === "INSTRUCTOR") {
        if (liveSession.instructor.toString() !== socket.user.id) {
          return socket.emit("chat:error", {
            message: "You are not authorized for this live class",
          });
        }
      } else if (socket.user.role === "STUDENT") {
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
      } else {
        return socket.emit("chat:error", {
          message: "You are not allowed to send messages",
        });
      }

      // Save message in MongoDB
      const savedMessage = await ChatMessage.create({
        liveSession: liveSession._id,
        sender: socket.user.id,
        senderRole: socket.user.role,
        message: message.trim(),
      });

      // Send saved message to everyone in this live class
      const messageData = {
        _id: savedMessage._id,
        liveSessionId: liveSession._id,
        senderId: socket.user.id,
        senderName: socket.user.name,
        senderRole: socket.user.role,
        message: savedMessage.message,
        createdAt: savedMessage.createdAt,
      };

      io.to(roomName).emit("chat:new-message", messageData);

    } catch (error) {
      console.error("Chat send error:", error);

      socket.emit("chat:error", {
        message: "Unable to send message",
      });
    }
  });
};
