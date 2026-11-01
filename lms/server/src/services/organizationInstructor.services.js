
import User from "../models/user.models.js";

// Search only independent instructors by exact email or instructorCode
export const searchIndependentInstructor = async (identifier) => {
  const searchValue = String(identifier || "").trim();

  if (!searchValue) {
    throw new Error("Instructor email or code is required");
  }

  let searchFilter;

  // Search by exact email
  if (searchValue.includes("@")) {
    const normalizedEmail = searchValue.toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      throw new Error("Invalid email address");
    }

    searchFilter = {
      email: normalizedEmail,
    };
  }

  // Search by exact Instructor ID
  else {
    const normalizedCode = searchValue.toUpperCase();

    if (!/^INS-[A-F0-9]{20}$/.test(normalizedCode)) {
      throw new Error("Invalid Instructor ID");
    }

    searchFilter = {
      instructorCode: normalizedCode,
    };
  }

  const instructor = await User.findOne({
    ...searchFilter,

    role: "INSTRUCTOR",
    organizationId: null,
    hiredBy: null,
    employmentStatus: "INDEPENDENT",
  })
    .select("_id name email instructorCode role employmentStatus")
    .lean();

  if (!instructor) {
    return null;
  }

  return {
    id: instructor._id,
    name: instructor.name,
    email: instructor.email,
    instructorCode: instructor.instructorCode,
    role: instructor.role,
    employmentStatus: instructor.employmentStatus,
  };
};
