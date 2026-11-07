
import User from "../models/user.models.js";
import Organization from "../models/organization.models.js";

export const organizationAdminMiddleware = async (
  req,
  res,
  next
) => {
  try {
    // 1. Authentication check
    if (!req.user?.id) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // 2. Verify actual Organization Admin from database
    const admin = await User.findOne({
      _id: req.user.id,
      role: "ADMIN",
      adminType: "ORGANIZATION_ADMIN",
      adminStatus: "ACTIVE",
    }).select(
      "_id name email organizationId adminType adminStatus role"
    );

    if (!admin) {
      return res.status(403).json({
        success: false,
        message: "Organization Admin access required",
      });
    }

    // 3. Check organization association
    if (!admin.organizationId) {
      return res.status(403).json({
        success: false,
        message: "Your account is not linked to an organization yet",
      });
    }

    // 4. Verify organization ownership and active status
    const organization = await Organization.findOne({
      _id: admin.organizationId,
      owner: admin._id,
      status: "ACTIVE",
    }).select("_id name owner status organizationType");

    if (!organization) {
      return res.status(403).json({
        success: false,
        message: "Active organization not found for this Admin",
      });
    }

    // 5. Attach trusted database records
    req.organizationAdmin = admin;
    req.organization = organization;
    req.organizationId = organization._id.toString();

    // 6. Attach bank-details context for future services
    req.bankDetailsContext = {
      organizationId: organization._id.toString(),
      organizationName: organization.name,
      adminId: admin._id.toString(),
    };

    return next();

  } catch (error) {
    console.error("Organization Admin Middleware Error:", error);

    return res.status(500).json({
      success: false,
      message: "Organization authorization failed",
    });
  }
};
