import {
  searchIndependentInstructor,
  hireInstructor,
  removeInstructor,
  getOrganizationInstructors,
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


// Hire independent instructor into Admin's organization
export const hireInstructorController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Organization details come from trusted middleware,
    // never from frontend request body.
    const instructor = await hireInstructor({
      userId,
      organizationId: req.organizationId,
      adminId: req.organizationAdmin._id,
    });

    return res.status(200).json({
      success: true,
      message: "Instructor hired successfully",
      data: {
        instructor,
      },
    });

  } catch (error) {
    console.error("Hire Instructor Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to hire instructor",
    });
  }
};


// Remove instructor from authenticated Admin's organization
export const removeInstructorController = async (req, res) => {
  try {
    const { instructorId } = req.params;

    const instructor = await removeInstructor({
      instructorId,
      organizationId: req.organizationId,
      adminId: req.organizationAdmin._id,
    });

    return res.status(200).json({
      success: true,
      message: "Instructor removed from organization successfully",
      data: {
        instructor,
      },
    });

  } catch (error) {
    console.error("Remove Instructor Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to remove instructor",
    });
  }
};


export const getOrganizationInstructorsController = async (
  req,
  res
) => {
  try {
    const instructors = await getOrganizationInstructors(
      req.organizationId
    );

    return res.status(200).json({
      success: true,
      message: "Organization instructors fetched successfully",
      data: {
        total: instructors.length,
        instructors,
      },
    });
  } catch (error) {
    console.error("Get Organization Instructors Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message:
        error.message || "Failed to fetch organization instructors",
    });
  }
};
