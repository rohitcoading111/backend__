import AdminRequest from "../models/adminRequest.models.js";
import User from "../models/user.models.js";
import Organization from "../models/organization.models.js";
import bcrypt from "bcryptjs";
import transporter from "../config/mailer.js";
import config from "../config/config.js";

export const createAdminRequest = async (data) => {
  const {
    name,
    email,
    mobile,
    organizationName,
    organizationType,
    description,
    logo,
    password,
  } = data;

  const normalizedEmail = email.toLowerCase().trim();
  const normalizedMobile = mobile.trim();

  // Do not allow an existing account to request another Admin account
  const existingUser = await User.findOne({
    $or: [
      { email: normalizedEmail },
      { mobile: normalizedMobile },
    ],
  });

  if (existingUser) {
    const error = new Error(
      "An account with this email or mobile already exists"
    );
    error.statusCode = 409;
    throw error;
  }

  const existingRequest = await AdminRequest.findOne({
    email: normalizedEmail,
    status: "PENDING",
  });

  if (existingRequest) {
    const error = new Error("A pending request already exists");
    error.statusCode = 409;
    throw error;
  }

  const adminRequest = await AdminRequest.create({
    name,
    email: normalizedEmail,
    mobile: normalizedMobile,
    organizationName,
    organizationType,
    description,
    logo,
    password: await bcrypt.hash(password, 12),
  });

  try {
    await transporter.sendMail({
      from: config.EMAIL_USER,
      to: config.ADMIN_EMAIL,
      subject: "New Organization Admin Request",
      html: `
        <h2>New Admin Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${normalizedEmail}</p>
        <p><strong>Mobile:</strong> ${normalizedMobile}</p>
        <p><strong>Organization:</strong> ${organizationName}</p>
        <p><strong>Type:</strong> ${organizationType}</p>
        <p><strong>Description:</strong> ${description || "Not provided"}</p>
        <p>Login to your Super Admin panel to review and approve this request.</p>
        <p><strong>Request ID:</strong> ${adminRequest._id}</p>
      `,
    });
  } catch (emailError) {
    // Keep the request saved so it can be reviewed from the panel.
    console.error("Admin request email notification failed:", emailError);
  }

  return adminRequest;
};


export const getPendingAdminRequests = async () => {
  return AdminRequest.find({ status: "PENDING" })
    .sort({ createdAt: -1 })
    .lean();
};


export const approveAdminRequest = async ({
  requestId,
  superAdminId,
}) => {
 const adminRequest = await AdminRequest.findOne({
  _id: requestId,
  status: "PENDING",
}).select("+password");

  if (!adminRequest) {
    const error = new Error("Pending admin request not found");
    error.statusCode = 404;
    throw error;
  }

  // Prevent duplicate accounts
  const existingUser = await User.findOne({
    $or: [
      { email: adminRequest.email },
      { mobile: adminRequest.mobile },
    ],
  });

  if (existingUser) {
    const error = new Error(
      "An account with this email or mobile already exists"
    );
    error.statusCode = 409;
    throw error;
  }

  let createdUser;
  let organization;

  try {
    // Create the Organization Admin account
    createdUser = await User.create({
      name: adminRequest.name,
      email: adminRequest.email,
      mobile: adminRequest.mobile,
      role: "ADMIN",
      accountType: "STUDENT",
      adminType: "ORGANIZATION_ADMIN",
      isVerified: false,
      password:adminRequest.password,
    });

    // Create the Admin's organization
    organization = await Organization.create({
      name: adminRequest.organizationName,
      owner: createdUser._id,
      organizationType: adminRequest.organizationType,
      description: adminRequest.description || "",
      logo: adminRequest.logo || {},
    });

    // Mark request as approved
    adminRequest.status = "APPROVED";
    adminRequest.reviewedBy = superAdminId;
    adminRequest.reviewedAt = new Date();
    adminRequest.createdAdmin = createdUser._id;
    adminRequest.organization = organization._id;

    await adminRequest.save();

    return {
      admin: {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        mobile: createdUser.mobile,
        role: createdUser.role,
        adminType: createdUser.adminType,
      },
      organization,
      request: adminRequest,
    };
  } catch (error) {
    // Compensate for partial creation if a later operation fails
    if (organization?._id) {
      await Organization.findByIdAndDelete(organization._id);
    }

    if (createdUser?._id) {
      await User.findByIdAndDelete(createdUser._id);
    }

    throw error;
  }
};


export const rejectAdminRequest = async ({
  requestId,
  superAdminId,
  rejectionReason,
}) => {
  const adminRequest = await AdminRequest.findOneAndUpdate(
    {
      _id: requestId,
      status: "PENDING",
    },
    {
      $set: {
        status: "REJECTED",
        reviewedBy: superAdminId,
        reviewedAt: new Date(),
        rejectionReason: rejectionReason || null,
      },
    },
    { new: true, runValidators: true }
  );

  if (!adminRequest) {
    const error = new Error("Pending admin request not found");
    error.statusCode = 404;
    throw error;
  }

  return adminRequest;
};
