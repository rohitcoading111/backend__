import mongoose from "mongoose";
import LiveSession from "../models/liveSession.models.js";
import Enrollment from "../models/enrollment.models.js";
import ChatMessage from "../models/chatMessage.models.js";
import {
  CHAT_COOLDOWN_OPTIONS,
  claimChatCooldown,
  getChatCooldownRemainingMs,
} from "../services/chatCooldown.service.js";

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
        .select(
          "course instructor status isChatEnabled chatCooldownSeconds"
        );

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
      const remainingCooldownMs = liveSession.chatCooldownSeconds
        ? await getChatCooldownRemainingMs({
            liveSessionId: liveSession._id,
            userId: socket.user.id,
          })
        : 0;

      socket.emit("chat:joined", {
        liveSessionId: liveSession._id,
        roomName,
        isChatEnabled: liveSession.isChatEnabled,
        chatCooldownSeconds: liveSession.chatCooldownSeconds || 0,
        remainingCooldownMs,
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
  socket.on(
    "chat:send",
    async ({ liveSessionId, message } = {}, acknowledge) => {
      const rejectSend = (errorResponse) => {
        socket.emit("chat:error", errorResponse);
        if (typeof acknowledge === "function") {
          acknowledge({ success: false, ...errorResponse });
        }
      };

      try {
        if (!mongoose.Types.ObjectId.isValid(liveSessionId)) {
          return rejectSend({
            message: "Invalid live session ID",
          });
        }

        if (typeof message !== "string" || !message.trim()) {
          return rejectSend({
            message: "Message cannot be empty",
          });
        }

        if (message.trim().length > 1000) {
          return rejectSend({
            message: "Message cannot exceed 1000 characters",
          });
        }

        const roomName = `live:${liveSessionId}`;

        // User must already be a member of this room
        if (!socket.rooms.has(roomName)) {
          return rejectSend({
            message: "Join the live chat first",
          });
        }

        const liveSession = await LiveSession.findById(liveSessionId)
          .select(
            "course instructor status isChatEnabled chatCooldownSeconds"
          );

        if (!liveSession || liveSession.status !== "LIVE") {
          return rejectSend({
            message: "Live session has ended or is unavailable",
          });
        }

        if (!liveSession.isChatEnabled) {
          return rejectSend({
            message: "Chat is currently paused by the instructor",
          });
        }

        // Verify current authorization again
        if (socket.user.role === "INSTRUCTOR") {
          if (liveSession.instructor.toString() !== socket.user.id) {
            return rejectSend({
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
            return rejectSend({
              message: "You are not enrolled in this course",
            });
          }
        } else {
          return rejectSend({
            message: "You are not allowed to send messages",
          });
        }

        const cooldown = await claimChatCooldown({
          liveSessionId: liveSession._id,
          userId: socket.user.id,
          cooldownSeconds: liveSession.chatCooldownSeconds || 0,
        });

        if (!cooldown.accepted) {
          return rejectSend({
            code: "CHAT_COOLDOWN",
            message: "Please wait before sending another message",
            remainingMs: cooldown.remainingMs,
          });
        }

        // Save message in MongoDB only after the cooldown claim succeeds
        const savedMessage = await ChatMessage.create({
          liveSession: liveSession._id,
          sender: socket.user.id,
          senderRole: socket.user.role,
          message: message.trim(),
        });

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

        if (typeof acknowledge === "function") {
          acknowledge({
            success: true,
            remainingMs: cooldown.expiresAt
              ? Math.max(
                  0,
                  new Date(cooldown.expiresAt).getTime() -
                    Date.now()
                )
              : 0,
          });
        }
      } catch (error) {
        console.error("Chat send error:", error);
        rejectSend({ message: "Unable to send message" });
      }
    }
  );

  // Instructor: Update cooldown for this live session
  socket.on(
    "chat:cooldown:set",
    async ({ liveSessionId, cooldownSeconds } = {}) => {
      try {
        if (!mongoose.Types.ObjectId.isValid(liveSessionId)) {
          return socket.emit("chat:error", {
            message: "Invalid live session ID",
          });
        }

        if (!CHAT_COOLDOWN_OPTIONS.includes(cooldownSeconds)) {
          return socket.emit("chat:error", {
            message: "Invalid chat cooldown duration",
          });
        }

        if (socket.user.role !== "INSTRUCTOR") {
          return socket.emit("chat:error", {
            message: "Only the instructor can change the chat cooldown",
          });
        }

        const roomName = `live:${liveSessionId}`;
        if (!socket.rooms.has(roomName)) {
          return socket.emit("chat:error", {
            message: "Join the live chat first",
          });
        }

        const liveSession = await LiveSession.findOneAndUpdate(
          {
            _id: liveSessionId,
            instructor: socket.user.id,
            status: "LIVE",
          },
          { $set: { chatCooldownSeconds: cooldownSeconds } },
          { new: true, runValidators: true }
        ).select("_id chatCooldownSeconds");

        if (!liveSession) {
          return socket.emit("chat:error", {
            message: "You are not authorized to change this chat setting",
          });
        }

        io.to(roomName).emit("chat:cooldown", {
          liveSessionId: liveSession._id,
          chatCooldownSeconds: liveSession.chatCooldownSeconds,
        });
      } catch (error) {
        console.error("Chat cooldown update error:", error);
        socket.emit("chat:error", {
          message: "Unable to update chat cooldown",
        });
      }
    }
  );

  // Instructor: Pause chat
  socket.on("chat:pause", async ({ liveSessionId } = {}) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(liveSessionId)) {
        return socket.emit("chat:error", {
          message: "Invalid live session ID",
        });
      }

      // Only instructor can control chat
      if (socket.user.role !== "INSTRUCTOR") {
        return socket.emit("chat:error", {
          message: "Only instructor can pause the chat",
        });
      }

      const liveSession = await LiveSession.findById(liveSessionId);

      if (!liveSession || liveSession.status !== "LIVE") {
        return socket.emit("chat:error", {
          message: "Live session not available",
        });
      }

      // Verify instructor ownership
      if (liveSession.instructor.toString() !== socket.user.id) {
        return socket.emit("chat:error", {
          message: "You are not authorized to control this chat",
        });
      }

      // Instructor must have joined this chat room
      const roomName = `live:${liveSession._id}`;

      if (!socket.rooms.has(roomName)) {
        return socket.emit("chat:error", {
          message: "Join the live chat first",
        });
      }

      liveSession.isChatEnabled = false;
      await liveSession.save();

      // Notify everyone in this live class
      io.to(roomName).emit("chat:status", {
        liveSessionId: liveSession._id,
        isChatEnabled: false,
        message: "Chat paused by instructor",
      });

    } catch (error) {
      console.error("Chat pause error:", error);

      socket.emit("chat:error", {
        message: "Unable to pause chat",
      });
    }
  });

  // Instructor: Resume chat
  socket.on("chat:resume", async ({ liveSessionId } = {}) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(liveSessionId)) {
        return socket.emit("chat:error", {
          message: "Invalid live session ID",
        });
      }

      if (socket.user.role !== "INSTRUCTOR") {
        return socket.emit("chat:error", {
          message: "Only instructor can resume the chat",
        });
      }

      const liveSession = await LiveSession.findById(liveSessionId);

      if (!liveSession || liveSession.status !== "LIVE") {
        return socket.emit("chat:error", {
          message: "Live session not available",
        });
      }

      if (liveSession.instructor.toString() !== socket.user.id) {
        return socket.emit("chat:error", {
          message: "You are not authorized to control this chat",
        });
      }

      const roomName = `live:${liveSession._id}`;

      if (!socket.rooms.has(roomName)) {
        return socket.emit("chat:error", {
          message: "Join the live chat first",
        });
      }

      liveSession.isChatEnabled = true;
      await liveSession.save();

      io.to(roomName).emit("chat:status", {
        liveSessionId: liveSession._id,
        isChatEnabled: true,
        message: "Chat resumed by instructor",
      });

    } catch (error) {
      console.error("Chat resume error:", error);

      socket.emit("chat:error", {
        message: "Unable to resume chat",
      });
    }
  });

};
