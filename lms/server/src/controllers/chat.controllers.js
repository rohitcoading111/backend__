
import { getChatHistory } from "../services/chat.service.js";

export const getChatHistoryController = async (req, res) => {
  try {
    const { liveSessionId } = req.params;

    const { limit = 50, before } = req.query;

    const result = await getChatHistory({
      liveSessionId,
      user: req.user,
      limit,
      before,
    });

    return res.status(200).json({
      success: true,
      message: "Chat history fetched successfully",
      data: result,
    });

  } catch (error) {
    console.error("Get chat history error:", error);

    const statusCode =
      error.message === "Invalid live session ID" ||
      error.message === "Invalid pagination date"
        ? 400
        : error.message === "Live session not available"
        ? 404
        : error.message === "You are not authorized for this live class" ||
          error.message === "You are not enrolled in this course" ||
          error.message === "You are not allowed to access this chat"
        ? 403
        : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Unable to fetch chat history",
    });
  }
};
