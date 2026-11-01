
import Organization from "../models/organization.models.js";
import User from "../models/user.models.js";

export const createOrganization = async ({
  adminId,
  name,
  organizationType,
  description,
  logo,
}) => {
  // Verify authenticated user is an Admin
  const admin = await User.findById(adminId).select("_id role");

  if (!admin || admin.role !== "ADMIN") {
    const error = new Error("Only admins can create an organization");
    error.statusCode = 403;
    throw error;
  }

  // One organization per Admin
  const existingOrganization = await Organization.findOne({
    owner: adminId,
  });

  if (existingOrganization) {
    const error = new Error("You already own an organization");
    error.statusCode = 409;
    throw error;
  }

  const organization = await Organization.create({
    name,
    owner: adminId,
    organizationType,
    description: description || "",
    logo: logo || {},
  });

  return organization;
};

export const getMyOrganization = async (adminId) => {
  const admin = await User.findById(adminId).select("_id role");

  if (!admin || admin.role !== "ADMIN") {
    const error = new Error("Only admins can access this resource");
    error.statusCode = 403;
    throw error;
  }

  const organization = await Organization.findOne({
    owner: adminId,
  }).populate("owner", "name email");

  if (!organization) {
    const error = new Error("Organization not found");
    error.statusCode = 404;
    throw error;
  }

  return organization;
};
