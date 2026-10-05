import { createCourse } from "../services/course.services.js";

export const createCourseController = async (req, res) => {
  try {
    const course = await createCourse({
      courseData: req.body,
      instructorId: req.user.id,
      file: req.file,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: {
        course,
      },
    });
  } catch (error) {
    console.error("Create Course Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};