
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
  if (!adminId) {
    const error = new Error("Admin ID is missing");
    error.statusCode = 401;
    throw error;
  }

  // Find only Organization Admin
  const admin = await User.findOne({
    _id: adminId,
    role: "ADMIN",
    adminType: "ORGANIZATION_ADMIN",
    adminStatus: { $ne: "SUSPENDED" },
  }).select(
    "_id name email role adminType organizationId adminStatus"
  );

  if (!admin) {
    const error = new Error(
      "Organization Admin access required"
    );
    error.statusCode = 403;
    throw error;
  }

  if (!admin.organizationId) {
    const error = new Error(
      "Your account is not linked to an organization"
    );
    error.statusCode = 403;
    throw error;
  }

  // Find only this admin's organization
  const organization = await Organization.findOne({
    _id: admin.organizationId,
    owner: admin._id,
    status: "ACTIVE",
  }).populate("owner", "name email");

  if (!organization) {
    const error = new Error(
      "Active organization not found"
    );
    error.statusCode = 404;
    throw error;
  }

  return organization;
};
