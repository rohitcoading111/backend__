import { createCourse,getCourse,getSingleCourse,updateCourse,deleteCourse,publishCourse,unpublishCourse} from "../services/course.services.js";

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


export const getMyCourses = async (req, res) => {
  try {
    const courses = await getCourse(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: {
        courses,
      },
    });
  } catch (error) {
    console.error("Get My Courses Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};


export const getSingleCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await getSingleCourse(
      courseId,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      data: {
        course,
      },
    });
  } catch (error) {
    console.error("Get Single Course Error:", error);

    if (error.message === "Course not found or access denied") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch course",
    });
  }
};


export const updateCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await updateCourse({
      courseId,
      instructorId: req.user.id,
      updateData: req.body,
      file: req.file,
    });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: {
        course,
      },
    });
  } catch (error) {
    console.error("Update Course Error:", error);

    if (error.message === "Course not found or access denied") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
};

export const deleteCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const deletedCourse = await deleteCourse(
      courseId,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: {
        course: deletedCourse,
      },
    });
  } catch (error) {
    console.error("Delete Course Error:", error);

    if (error.message === "Course not found or access denied") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};

export const publishCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await publishCourse(
      courseId,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Course published successfully",
      data: {
        course,
      },
    });
  } catch (error) {
    console.error("Publish Course Error:", error);

    if (
      error.message === "Course not found or access denied" ||
      error.message === "Course is already published"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to publish course",
    });
  }
};

export const unpublishCourseController = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await unpublishCourse(
      courseId,
      req.user.id
    );

    return res.status(200).json({
      success: true,
      message: "Course unpublished successfully",
      data: {
        course,
      },
    });
  } catch (error) {
    console.error("Unpublish Course Error:", error);

    if (
      error.message === "Course not found or access denied" ||
      error.message === "Course is already in draft"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to unpublish course",
    });
  }
};