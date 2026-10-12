import Enrollment from "../models/enrollment.models.js";

export const getMyEnrollments = async (studentId) => {
  if (!studentId) {
    throw new Error("Invalid student ID");
  }

  const enrollments = await Enrollment.find({
    student: studentId,
    status: "ACTIVE",
  })
    .populate("course", "title description thumbnail price category level")
    .sort({ enrolledAt: -1 });

  return enrollments;
};