
import User from "../models/user.models.js";
import Organization from "../models/organization.models.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// Suspend Organization Admin and their Organization
export const suspendOrganizationAdmin = async (adminId) => {

  // Find only Organization Admin
  const admin = await User.findOne({
    _id: adminId,
    role: "ADMIN",
    adminType: "ORGANIZATION_ADMIN",
  }).select("_id name email adminType adminStatus organizationId");

  if (!admin) {
    throw createError("Organization Admin not found", 404);
  }

  if (admin.adminStatus === "SUSPENDED") {
    throw createError("Organization Admin is already suspended", 409);
  }

  if (!admin.organizationId) {
    throw createError(
      "Organization is not linked to this Admin",
      409
    );
  }

  // Verify organization ownership
  const organization = await Organization.findOne({
    _id: admin.organizationId,
    owner: admin._id,
  });

  if (!organization) {
    throw createError("Admin organization not found", 404);
  }

  if (organization.status === "SUSPENDED") {
    throw createError("Organization is already suspended", 409);
  }

  // First suspend the organization
  organization.status = "SUSPENDED";
  await organization.save();

  try {
    // Then suspend the Organization Admin
    const suspendedAdmin = await User.findOneAndUpdate(
      {
        _id: admin._id,
        role: "ADMIN",
        adminType: "ORGANIZATION_ADMIN",
        organizationId: organization._id,
        adminStatus: { $ne: "SUSPENDED" },
      },
      {
        $set: {
          adminStatus: "SUSPENDED",
          refreshToken: null,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("_id name email role adminType adminStatus organizationId");

    if (!suspendedAdmin) {
      throw createError(
        "Admin could not be suspended",
        409
      );
    }

    return {
      admin: suspendedAdmin,
      organization: {
        id: organization._id,
        name: organization.name,
        status: organization.status,
      },
    };

  } catch (error) {
    // Roll back organization status if Admin update fails
    organization.status = "ACTIVE";
    await organization.save();

    throw error;
  }
};
