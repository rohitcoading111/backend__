
import {
  createLiveSession,
  getActiveLiveSession,
  endLiveSession,
  joinLiveSession,
  getLiveKitRoom,
} from "../services/liveSession.services.js";


// CREATE LIVE SESSION
export const createLiveSessionController = async (req, res) => {
  try {
    const { courseId } = req.body;
    const instructorId = req.user.id;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const result = await createLiveSession(
      courseId,
      instructorId,
      req.organizationId
    );

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
    console.error("Create Live Session Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


// GET ACTIVE LIVE SESSION
export const getActiveLiveSessionController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const activeSession = await getActiveLiveSession(
      courseId,
      req.user.id,
      req.user.role
    );

    if (!activeSession) {
      return res.status(404).json({
        success: false,
        message: "No active live session found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Active live session fetched successfully",
      data: activeSession,
    });
  } catch (error) {
    console.error("Get Active Live Session Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch active live session",
    });
  }
};


// END LIVE SESSION
export const endLiveSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await endLiveSession(
      sessionId,
      req.user.id,
      req.organizationId
    );

    return res.status(200).json({
      success: true,
      message: "Live session ended successfully",
      data: session,
    });
  } catch (error) {
    console.error("End Live Session Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


// JOIN LIVE SESSION
export const joinLiveSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const result = await joinLiveSession(
      sessionId,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Live class access granted",
      data: result,
    });
  } catch (error) {
    console.error("Join Live Session Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


// GET LIVEKIT ROOM
export const getLiveKitRoomController = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!roomId) {
      return res.status(400).json({
        success: false,
        message: "Room ID is required",
      });
    }

    const room = await getLiveKitRoom(
      roomId,
      req.user.id,
      req.organizationId
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "LiveKit room not found or access denied",
      });
    }

    return res.status(200).json({
      success: true,
      message: "LiveKit room found",
      data: room,
    });
  } catch (error) {
    console.error("Get LiveKit Room Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch LiveKit room",
    });
  }
};
