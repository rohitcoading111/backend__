
import {
  markLectureComplete,
  getCourseProgress,
  getLearningSummary,
} from "../services/progress.services.js";

// 1. Mark lecture as complete
export const completeLecture = async (req, res) => {
  try {
    const studentId = req.user?._id;
    const { lectureId } = req.params;

    if (!studentId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const progress = await markLectureComplete({
      studentId,
      lectureId,
    });

    return res.status(200).json({
      success: true,
      message: "Lecture marked as completed.",
      data: { progress },
    });
  } catch (error) {
    console.error("Complete lecture error:", error);

    const statusCode = error.message?.includes("not found")
      ? 404
      : error.message?.includes("not actively enrolled")
        ? 403
        : error.message?.includes("Invalid")
          ? 400
          : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to complete lecture.",
    });
  }
};

// 2. Get progress for a particular course
export const fetchCourseProgress = async (req, res) => {
  try {
    const studentId = req.user?._id;
    const { courseId } = req.params;

    if (!studentId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const progress = await getCourseProgress({
      studentId,
      courseId,
    });

    return res.status(200).json({
      success: true,
      data: { progress },
    });
  } catch (error) {
    console.error("Fetch course progress error:", error);

    const statusCode = error.message?.includes("not found")
      ? 404
      : error.message?.includes("not actively enrolled")
        ? 403
        : error.message?.includes("Invalid")
          ? 400
          : 500;

    return res.status(statusCode).json({
      success: false,
      message: error.message || "Failed to fetch course progress.",
    });
  }
};

// 3. Get overall learning summary for dashboard
export const fetchLearningSummary = async (req, res) => {
  try {
    const studentId = req.user?._id;

    if (!studentId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const summary = await getLearningSummary({ studentId });

    return res.status(200).json({
      success: true,
      data: { summary },
    });
  } catch (error) {
    console.error("Fetch learning summary error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch learning summary.",
    });
  }
};
