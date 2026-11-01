
import {
  createLecture,
  updateLecture,
  deleteLecture,
  getLectures,
  getLectureVideo,
  markLectureCompleted,
} from "../services/lecture.services.js";


// CREATE LECTURE
export const createLectureController = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const lecture = await createLecture({
      moduleId,
      instructorId: req.user.id,
      organizationId: req.organizationId,
      title: req.body.title,
      notes: req.body.notes,
      order: Number(req.body.order),
      videoFile: req.file,
    });

    return res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      data: {
        lecture,
      },
    });
  } catch (error) {
    console.error("Create Lecture Error:", error);

    if (error.message === "Module not found" ||
        error.message === "Course not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Access denied") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Lecture order already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Invalid module or instructor ID") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create lecture",
    });
  }
};


// UPDATE LECTURE
export const updateLectureController = async (req, res) => {
  try {
    const { lectureId } = req.params;

    let order;

    if (req.body.order !== undefined) {
      order = Number(req.body.order);

      if (!Number.isInteger(order) || order < 1) {
        return res.status(400).json({
          success: false,
          message: "Order must be a positive integer",
        });
      }
    }

    const lecture = await updateLecture({
      lectureId,
      instructorId: req.user.id,
      organizationId: req.organizationId,
      title: req.body.title,
      notes: req.body.notes,
      order,
      videoFile: req.file,
    });

    return res.status(200).json({
      success: true,
      message: "Lecture updated successfully",
      data: {
        lecture,
      },
    });
  } catch (error) {
    console.error("Update Lecture Error:", error);

    if (error.message === "Invalid lecture or instructor ID") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message === "Lecture not found" ||
      error.message === "Module not found" ||
      error.message === "Course not found"
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Access denied") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Lecture order already exists") {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update lecture",
    });
  }
};


// DELETE LECTURE
export const deleteLectureController = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const result = await deleteLecture({
      lectureId,
      instructorId: req.user.id,
      organizationId: req.organizationId,
    });

    if (result.videoCleanupFailed) {
      return res.status(200).json({
        success: true,
        message: "Lecture deleted, but video cleanup failed",
        data: {
          lecture: result.lecture,
        },
        warning: "Video may still exist in ImageKit",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
      data: {
        lecture: result.lecture,
      },
    });
  } catch (error) {
    console.error("Delete Lecture Error:", error);

    if (error.message === "Invalid lecture or instructor ID") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message === "Lecture not found" ||
      error.message === "Module not found" ||
      error.message === "Course not found"
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Access denied") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete lecture",
    });
  }
};


// GET LECTURES OF A MODULE
export const getLecturesController = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const lectures = await getLectures({
      moduleId,
      userId: req.user.id,
      userRole: req.user.role,
    });

    const lectureData = lectures.map((lecture) => ({
      _id: lecture._id,
      title: lecture.title,
      notes: lecture.notes,
      module: lecture.module,
      order: lecture.order,
      videoAvailable: Boolean(lecture.video?.fileId),
      isCompleted: Boolean(lecture.isCompleted),
      createdAt: lecture.createdAt,
      updatedAt: lecture.updatedAt,
    }));

    return res.status(200).json({
      success: true,
      message: "Lectures fetched successfully",
      data: {
        lectures: lectureData,
      },
    });
  } catch (error) {
    console.error("Get Lectures Error:", error);

    if (
      error.message === "Invalid module or user ID" ||
      error.name === "CastError"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid module or user ID",
      });
    }

    if (
      error.message === "Module not found" ||
      error.message === "Course not found" ||
      error.message === "Course is not available"
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Access denied") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lectures",
    });
  }
};


// GET LECTURE VIDEO
export const getLectureVideoController = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const videoData = await getLectureVideo({
      lectureId,
      userId: req.user.id,
      userRole: req.user.role,
    });

    return res.status(200).json({
      success: true,
      message: "Lecture video fetched successfully",
      data: {
        lecture: {
          _id: videoData.lectureId,
          title: videoData.title,
        },
        videoUrl: videoData.videoUrl,
      },
    });
  } catch (error) {
    console.error("Get Lecture Video Error:", error);

    if (
      error.message === "Invalid lecture or user ID" ||
      error.name === "CastError"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid lecture or user ID",
      });
    }

    if (
      error.message === "Lecture not found" ||
      error.message === "Module not found" ||
      error.message === "Course not found" ||
      error.message === "Course is not available" ||
      error.message === "Video not available"
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Access denied") {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lecture video",
    });
  }
};


// MARK LECTURE COMPLETED
export const markLectureCompletedController = async (req, res) => {
  try {
    const result = await markLectureCompleted({
      lectureId: req.params.lectureId,
      studentId: req.user.id,
    });

    return res.status(200).json({
      success: true,
      message: "Lecture marked as completed",
      data: result,
    });
  } catch (error) {
    const statusCode =
      error.message === "Lecture not found" ||
      error.message === "Module not found" ||
      error.message === "Course not found"
        ? 404
        : error.message === "Active enrollment not found"
          || error.message === "Course is not available"
          ? 403
          : 500;

    return res.status(statusCode).json({
      success: false,
      message:
        statusCode === 500
          ? "Failed to complete lecture"
          : error.message,
    });
  }
};
