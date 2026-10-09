import { createLecture } from "../services/lecture.services.js";

export const createLectureController = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const lecture = await createLecture({
      moduleId,
      instructorId: req.user.id,
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

    if (error.message === "Module not found") {
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