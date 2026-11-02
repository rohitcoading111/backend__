import User from "../models/user.models.js";
import Course from "../models/course.models.js";
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



const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Hire an independent instructor into Admin's organization
export const hireInstructor = async ({
  userId,
  organizationId,
  adminId,
}) => {
  const instructor = await User.findById(userId).select(
    "_id name email role instructorCode organizationId hiredBy employmentStatus"
  );

  if (!instructor) {
    throw createError("Instructor not found", 404);
  }

  if (instructor.role !== "INSTRUCTOR") {
    throw createError(
      "Only registered instructors can be hired",
      400
    );
  }

  if (!instructor.instructorCode) {
    throw createError(
      "Instructor ID is missing",
      409
    );
  }

  if (
    instructor.organizationId ||
    instructor.hiredBy ||
    instructor.employmentStatus !== "INDEPENDENT"
  ) {
    throw createError(
      "This instructor is already associated with an organization",
      409
    );
  }

  // Step 1: Hire instructor
  const hiredInstructor = await User.findOneAndUpdate(
    {
      _id: instructor._id,
      role: "INSTRUCTOR",
      instructorCode: instructor.instructorCode,
      organizationId: null,
      hiredBy: null,
      employmentStatus: "INDEPENDENT",
    },
    {
      $set: {
        organizationId,
        hiredBy: adminId,
        employmentStatus: "ACTIVE",
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select(
    "_id name email role instructorCode organizationId hiredBy employmentStatus"
  );

  if (!hiredInstructor) {
    throw createError(
      "Instructor could not be hired. They may have already been hired",
      409
    );
  }

  // Step 2: Link instructor's existing courses to organization
  let linkedCourses;

  try {
    linkedCourses = await Course.updateMany(
      {
        instructor: hiredInstructor._id,
        organizationId: null,
      },
      {
        $set: {
          organizationId: organizationId,
        },
      }
    );
  } catch (error) {
    // Roll back hiring if course linking fails
    await Course.updateMany(
      {
        instructor: hiredInstructor._id,
        organizationId,
      },
      {
        $set: {
          organizationId: null,
        },
      }
    );

    await User.findOneAndUpdate(
      {
        _id: hiredInstructor._id,
        organizationId,
        hiredBy: adminId,
        employmentStatus: "ACTIVE",
      },
      {
        $set: {
          organizationId: null,
          hiredBy: null,
          employmentStatus: "INDEPENDENT",
        },
      }
    );

    throw createError(
      "Instructor hiring failed because existing courses could not be linked.",
      500
    );
  }

  // Step 3: Return hiring details
  return {
    id: hiredInstructor._id,
    name: hiredInstructor.name,
    email: hiredInstructor.email,
    role: hiredInstructor.role,
    instructorCode: hiredInstructor.instructorCode,
    organizationId: hiredInstructor.organizationId,
    hiredBy: hiredInstructor.hiredBy,
    employmentStatus: hiredInstructor.employmentStatus,
    linkedCourses: linkedCourses.modifiedCount,
  };
};


export const removeInstructor = async ({
  instructorId,
  organizationId,
  adminId,
}) => {
  const instructor = await User.findOneAndUpdate(
    {
      _id: instructorId,
      role: "INSTRUCTOR",

      // Only this Admin's organization's employee
      organizationId,
      hiredBy: adminId,
      employmentStatus: "ACTIVE",
    },
    {
      $set: {
        organizationId: null,
        hiredBy: null,
        employmentStatus: "INDEPENDENT",
      },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select(
    "_id name email role instructorCode organizationId hiredBy employmentStatus"
  );

  if (!instructor) {
    const error = new Error(
      "Instructor not found in your organization or already removed"
    );
    error.statusCode = 404;
    throw error;
  }

  return {
    id: instructor._id,
    name: instructor.name,
    email: instructor.email,
    role: instructor.role,
    instructorCode: instructor.instructorCode,
    organizationId: instructor.organizationId,
    hiredBy: instructor.hiredBy,
    employmentStatus: instructor.employmentStatus,
  };
};


// Get all active instructors belonging to Admin's organization
export const getOrganizationInstructors = async (organizationId) => {
  if (!organizationId) {
    const error = new Error("Organization ID is required");
    error.statusCode = 400;
    throw error;
  }

  const instructors = await User.find({
    organizationId,
    role: "INSTRUCTOR",
    employmentStatus: "ACTIVE",
  })
    .select(
      "_id name email instructorCode role employmentStatus createdAt"
    )
    .sort({ createdAt: -1 })
    .lean();

  return instructors;
};