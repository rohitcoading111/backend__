import { createLiveSession } from "../services/liveSession.services.js";

export const createLiveSessionController = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const instructorId = req.user.id || req.user._id;

    const liveSession = await createLiveSession(
      courseId,
      instructorId
    );

    return res.status(201).json({
      success: true,
      message: "Live session created successfully",
      data: liveSession,
    });
  } catch (error) {
    console.error("Create live session error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Internal server error",
    });
  }
};
