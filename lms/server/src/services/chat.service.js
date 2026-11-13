import mongoose from "mongoose";
import LiveSession from "../models/liveSession.models.js";
import Enrollment from "../models/enrollment.models.js";
import ChatMessage from "../models/chatMessage.models.js";

export const getChatHistory = async ({
  liveSessionId,
  user,
  limit = 50,
  before,
}) => {
  // 1. Validate live session ID
  if (!mongoose.Types.ObjectId.isValid(liveSessionId)) {
    throw new Error("Invalid live session ID");
  }

  // 2. Find live session
  const liveSession = await LiveSession.findById(liveSessionId)
    .select("course instructor status");

  if (!liveSession || liveSession.status !== "LIVE") {
    throw new Error("Live session not available");
  }

  // 3. Verify user authorization
  if (user.role === "INSTRUCTOR") {
    if (liveSession.instructor.toString() !== user.id) {
      throw new Error("You are not authorized for this live class");
    }
  } else if (user.role === "STUDENT") {
    const enrollment = await Enrollment.findOne({
      student: user.id,
      course: liveSession.course,
      status: "ACTIVE",
    });

    if (!enrollment) {
      throw new Error("You are not enrolled in this course");
    }
  } else {
    throw new Error("You are not allowed to access this chat");
  }

  // 4. Prepare pagination
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 100);

  const query = {
    liveSession: liveSession._id,
  };

  if (before) {
    const beforeDate = new Date(before);

    if (Number.isNaN(beforeDate.getTime())) {
      throw new Error("Invalid pagination date");
    }

    query.createdAt = { $lt: beforeDate };
  }

  // 5. Fetch messages
  const messages = await ChatMessage.find(query)
    .populate("sender", "name avatar")
    .sort({ createdAt: -1 })
    .limit(safeLimit)
    .lean();

  // 6. Reverse for chronological display
  messages.reverse();

  return {
    messages,
    hasMore: messages.length === safeLimit,
    nextCursor:
      messages.length > 0
        ? messages[0].createdAt
        : null,
  };
};
