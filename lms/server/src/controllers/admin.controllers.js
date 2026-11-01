import User from "../models/user.models.js";


import {
  suspendOrganizationAdmin,
} from "../services/admin.services.js";



export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({
      role: "ADMIN",
      adminType: "ORGANIZATION_ADMIN",
    })
      .select(
        "_id name email mobile role adminType organizationId isVerified createdAt"
      )
      .populate(
        "organizationId",
        "name organizationType status"
      )
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: {
        total: users.length,
        users,
      },
    });
  } catch (error) {
    console.error("Get Organization Admins Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch Organization Admins",
    });
  }
};


export const suspendOrganizationAdminController = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;

    const result = await suspendOrganizationAdmin(userId);

    return res.status(200).json({
      success: true,
      message: "Organization Admin suspended successfully",
      data: {
        admin: result.admin,
        organization: result.organization,
      },
    });

  } catch (error) {
    console.error("Suspend Organization Admin Error:", error);

    return res.status(error.statusCode || 500).json({
      success: false,
      message:
        error.message || "Failed to suspend Organization Admin",
    });
  }
};