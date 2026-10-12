import { getMyEnrollments } from "../services/enrollment.services.js";

export const getMyEnrollmentsController = async (req, res) => {
  try {
    const enrollments = await getMyEnrollments(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Enrollments fetched successfully",
      data: {
        enrollments,
      },
    });
  } catch (error) {
    console.error("Get My Enrollments Error:", error);

    if (error.message === "Invalid student ID") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to fetch enrollments",
    });
  }
};