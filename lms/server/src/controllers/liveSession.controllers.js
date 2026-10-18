import { createLiveSession,getActiveLiveSession,endLiveSession,joinLiveSession } from "../services/liveSession.services.js";



export const createLiveSessionController = async (req, res) => {
  try {
    const { courseId } = req.body;
    const instructorId = req.user.id || req.user._id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const result = await createLiveSession(courseId, instructorId);

    return res.status(201).json({
      success: true,
      message: "Live session created successfully",
      data: {
        session: result.session,
        token: result.token,
        liveKitUrl: result.liveKitUrl,
      },
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

export const getActiveLiveSessionController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const session = await getActiveLiveSession(courseId);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "No active live session found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Active live session fetched successfully",
      data: session,
    });
  } catch (error) {
    console.error("Get active live session error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch active live session",
    });
  }
};

export const endLiveSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const instructorId = req.user.id || req.user._id;

    const session = await endLiveSession(sessionId, instructorId);

    return res.status(200).json({
      success: true,
      message: "Live session ended successfully",
      data: session,
    });
  } catch (error) {
    console.error("End live session error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Internal server error",
    });
  }
};

export const joinLiveSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const studentId = req.user.id || req.user._id;

    const result = await joinLiveSession(sessionId, studentId);

    return res.status(200).json({
      success: true,
      message: "Live class access granted",
      data: result,
    });
  } catch (error) {
    console.error("Join live session error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode
        ? error.message
        : "Internal server error",
    });
  }
};