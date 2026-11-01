
import User from "../models/user.models.js";
import Organization from "../models/organization.models.js";

export const organizationAdminMiddleware = async (
  req,
  res,
  next
) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Fetch latest Admin data from database
    const admin = await User.findOne({
      _id: req.user.id,
      role: "ADMIN",
      adminType: "ORGANIZATION_ADMIN",
    }).select("_id name email organizationId adminType role");

    if (!admin) {
      return res.status(403).json({
        success: false,
        message: "Organization Admin access required",
      });
    }

    if (!admin.organizationId) {
      return res.status(403).json({
        success: false,
        message: "Your account is not linked to an organization yet",
      });
    }

    // Verify that this organization actually belongs to this Admin
    const organization = await Organization.findOne({
      _id: admin.organizationId,
      owner: admin._id,
      status: "ACTIVE",
    }).select("_id name owner status");

    if (!organization) {
      return res.status(403).json({
        success: false,
        message: "Active organization not found for this Admin",
      });
    }

    // Attach trusted database data for upcoming services
    req.organizationAdmin = admin;
    req.organization = organization;
    req.organizationId = organization._id;

    next();
  } catch (error) {
    console.error("Organization Admin Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "Organization authorization failed",
    });
  }
};
