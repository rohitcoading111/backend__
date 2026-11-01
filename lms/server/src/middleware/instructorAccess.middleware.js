
import User from "../models/user.models.js";
import Organization from "../models/organization.models.js";

export const instructorAccessMiddleware = async (
  req,
  res,
  next
) => {
  try {
    // 1. Fetch latest Instructor from database
    const instructor = await User.findOne({
      _id: req.user.id,
      role: "INSTRUCTOR",
    }).select(
      "_id name role instructorCode organizationId hiredBy employmentStatus"
    );

    if (!instructor) {
      return res.status(403).json({
        success: false,
        message: "Instructor access required",
      });
    }

    // 2. Independent Instructor cannot access LMS management
    if (
      !instructor.organizationId ||
      !instructor.hiredBy ||
      instructor.employmentStatus !== "ACTIVE"
    ) {
      return res.status(403).json({
        success: false,
        message: "You must be hired by an organization to access LMS management",
      });
    }

    // 3. Verify Organization is active and belongs to hiring Admin
    const organization = await Organization.findOne({
      _id: instructor.organizationId,
      owner: instructor.hiredBy,
      status: "ACTIVE",
    }).select("_id name owner status");

    if (!organization) {
      return res.status(403).json({
        success: false,
        message: "Organization is inactive or access denied",
      });
    }

    // 4. Verify hiring Organization Admin is active
    const admin = await User.findOne({
      _id: instructor.hiredBy,
      role: "ADMIN",
      adminType: "ORGANIZATION_ADMIN",
      organizationId: organization._id,
      adminStatus: { $ne: "SUSPENDED" },
    }).select("_id");

    if (!admin) {
      return res.status(403).json({
        success: false,
        message: "Organization Admin access is inactive",
      });
    }

    // 5. Attach trusted organization data to request
    req.instructor = instructor;
    req.organizationAdmin = admin;
    req.organization = organization;
    req.organizationId = organization._id;
    req.courseScope = "ORGANIZATION";

    next();

  } catch (error) {
    console.error("Instructor Access Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "Instructor authorization failed",
    });
  }
};
