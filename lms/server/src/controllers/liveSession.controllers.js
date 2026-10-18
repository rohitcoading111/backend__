
import { randomUUID } from "node:crypto";
import Course from "../models/course.models.js";
import LiveSession from "../models/liveSession.models.js";

export const createLiveSessionController = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Sirf course ka owner live session create kar sakta hai
    if (course.instructor.toString() !== (req.user._id || req.user.id).toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only start a live session for your own course",
      });
    }

    if (course.status !== "PUBLISHED") {
      return res.status(400).json({
        success: false,
        message: "Only published courses can have live sessions",
      });
    }

    // Ek course mein ek waqt par sirf ek live session
    const existingSession = await LiveSession.findOne({
      course: course._id,
      status: "LIVE",
    });

    if (existingSession) {
      return res.status(409).json({
        success: false,
        message: "This course already has a live session",
      });
    }

    const liveSession = await LiveSession.create({
      course: course._id,
      instructor: req.user._id || req.user.id,
      roomId: randomUUID(),
      status: "LIVE",
      startedAt: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Live session created successfully",
      data: liveSession,
    });
  } catch (error) {
    console.error("Create live session error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
