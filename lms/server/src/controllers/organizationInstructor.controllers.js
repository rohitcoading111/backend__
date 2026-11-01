
import {
  searchIndependentInstructor,
} from "../services/organizationInstructor.services.js";

export const searchIndependentInstructorController = async (
  req,
  res
) => {
  try {
    const { identifier } = req.query;

    const instructor = await searchIndependentInstructor(identifier);

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Independent instructor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Instructor found successfully",
      data: {
        instructor,
      },
    });
  } catch (error) {
    const validationErrors = [
      "Instructor email or code is required",
      "Invalid email address",
      "Invalid Instructor ID",
    ];

    const statusCode = validationErrors.includes(error.message)
      ? 400
      : 500;

    if (statusCode === 500) {
      console.error("Search Instructor Error:", error);
    }

    return res.status(statusCode).json({
      success: false,
      message:
        statusCode === 400
          ? error.message
          : "Unable to search instructor",
    });
  }
};
