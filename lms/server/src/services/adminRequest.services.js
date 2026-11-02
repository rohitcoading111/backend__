import AdminRequest from "../models/adminRequest.models.js";
import User from "../models/user.models.js";
import Organization from "../models/organization.models.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import transporter from "../config/mailer.js";
import config from "../config/config.js";

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

const safeRequest = (request) => {
  const data = request.toObject ? request.toObject() : { ...request };

  delete data.password;
  delete data.verificationTokenHash;
  delete data.verificationTokenExpiresAt;

  return data;
};

// 1. Submit a new organization admin request
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

  const existingUser = await User.findOne({
    $or: [
      { email: normalizedEmail },
      { mobile: normalizedMobile },
    ],
  });

  if (existingUser) {
    throw createError(
      "An account with this email or mobile already exists",
      409
    );
  }

  const existingRequest = await AdminRequest.findOne({
    $or: [
      { email: normalizedEmail },
      { mobile: normalizedMobile },
    ],
    status: { $in: ["PENDING", "VERIFIED"] },
  });

  if (existingRequest) {
    throw createError(
      "An active request with this email or mobile already exists",
      409
    );
  }

  // Generate a secure one-time email verification token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationTokenHash = hashToken(verificationToken);

  const adminRequest = await AdminRequest.create({
    name,
    email: normalizedEmail,
    mobile: normalizedMobile,
    organizationName,
    organizationType,
    description,
    logo,
    password: await bcrypt.hash(password, 12),
    status: "PENDING",
    verificationTokenHash,
    verificationTokenExpiresAt: new Date(
      Date.now() + 24 * 60 * 60 * 1000
    ),
  });

  // Set this in .env:
  // API_BASE_URL=http://localhost:3000/api
  const apiBaseUrl = (
    process.env.API_BASE_URL || "http://localhost:3000/api"
  ).replace(/\/+$/, "");

 const verificationUrl =
  `${apiBaseUrl}/admin-requests/verify-email/${verificationToken}`;
  const escapeHtml = (value = "") =>
    String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);

  try {
    await transporter.sendMail({
      to: config.ADMIN_EMAIL,
      subject: "New Organization Admin Request - Verification Required",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px">
          <h2>New Organization Admin Request</h2>

          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(normalizedEmail)}</p>
          <p><strong>Mobile:</strong> ${escapeHtml(normalizedMobile)}</p>
          <p><strong>Organization:</strong> ${escapeHtml(organizationName)}</p>
          <p><strong>Type:</strong> ${escapeHtml(organizationType)}</p>
          <p><strong>Description:</strong> ${escapeHtml(description || "Not provided")}</p>

          <p>Review this request and verify it before approving.</p>

          <a
            href="${verificationUrl}"
            style="
              display:inline-block;
              background:#2563eb;
              color:#ffffff;
              padding:12px 24px;
              text-decoration:none;
              border-radius:6px;
              font-weight:bold;
            "
          >
            Verify Request
          </a>

          <p style="margin-top:20px;color:#666;font-size:13px">
            This verification link expires in 24 hours.
          </p>

          <p style="color:#666;font-size:13px">
            Request ID: ${adminRequest._id}
          </p>
        </div>
      `,
    });
  } catch (emailError) {
    console.error("Admin request email notification failed:", emailError);
  }

  return adminRequest;
};


// 2. Show both unverified and verified requests in Super Admin panel
export const getAdminRequestEmailApprovalDetails = async (token) => {
  if (!token) {
    throw createError("Verification token is missing", 400);
  }

  const request = await AdminRequest.findOne({
    verificationTokenHash: hashToken(token),
    verificationTokenExpiresAt: { $gt: new Date() },
    status: { $in: ["PENDING", "VERIFIED"] },
  }).select("+verificationTokenHash +verificationTokenExpiresAt");

  if (!request) {
    throw createError(
      "Invalid, expired, or already used approval link",
      400
    );
  }

  return {
    name: request.name,
    email: request.email,
    organizationName: request.organizationName,
    organizationType: request.organizationType,
  };
};


export const approveAdminRequestByEmailToken = async (token) => {
  if (!token) {
    throw createError("Approval token is missing", 400);
  }

  const request = await AdminRequest.findOne({
    verificationTokenHash: hashToken(token),
    verificationTokenExpiresAt: { $gt: new Date() },
    status: { $in: ["PENDING", "VERIFIED"] },
  }).select("+verificationTokenHash +verificationTokenExpiresAt");

  if (!request) {
    throw createError(
      "Approval link is invalid, expired, or already used",
      400
    );
  }

  const superAdmin = await User.findOne({
    email: config.ADMIN_EMAIL.toLowerCase().trim(),
    role: "ADMIN",
    adminType: "SUPER_ADMIN",
  }).select("_id");

  if (!superAdmin) {
    throw createError("Super Admin account not found", 404);
  }

  // Email approval also verifies the request.
  if (request.status === "PENDING") {
    request.status = "VERIFIED";
    request.emailVerifiedAt = new Date();
    await request.save();
  }

  return approveAdminRequest({
    requestId: request._id,
    superAdminId: superAdmin._id,
  });
};

// 3. Verify request from Super Admin panel
export const verifyAdminRequestById = async ({ requestId }) => {
  const adminRequest = await AdminRequest.findById(requestId);

  if (!adminRequest) {
    throw createError("Admin request not found", 404);
  }

  if (adminRequest.status === "VERIFIED") {
    return safeRequest(adminRequest);
  }

  if (adminRequest.status !== "PENDING") {
    throw createError("This request cannot be verified", 400);
  }

  adminRequest.status = "VERIFIED";
  adminRequest.emailVerifiedAt = new Date();

  // Keep the email token available until it is used or expires.
  await adminRequest.save();

  return safeRequest(adminRequest);
};


// 4. Verify request by clicking the email button
export const verifyAdminRequestByToken = async (token) => {
  if (!token) {
    throw createError("Verification token is missing", 400);
  }

  const verificationTokenHash = hashToken(token);

  const adminRequest = await AdminRequest.findOne({
    verificationTokenHash,
    verificationTokenExpiresAt: { $gt: new Date() },
    status: { $in: ["PENDING", "VERIFIED"] },
  }).select("+verificationTokenHash +verificationTokenExpiresAt");

  if (!adminRequest) {
    throw createError(
      "Verification link is invalid, expired, or already used",
      400
    );
  }

  if (adminRequest.status === "PENDING") {
    adminRequest.status = "VERIFIED";
    adminRequest.emailVerifiedAt = new Date();
  }

  // One-time email link: invalidate after it is clicked.
  adminRequest.verificationTokenHash = null;
  adminRequest.verificationTokenExpiresAt = null;

  await adminRequest.save();

  return safeRequest(adminRequest);
};

// 5. Create Admin and Organization only after verification
export const approveAdminRequest = async ({
  requestId,
  superAdminId,
}) => {
  const adminRequest = await AdminRequest.findById(requestId)
    .select("+password");

  if (!adminRequest) {
    throw createError("Admin request not found", 404);
  }

  // Only verified requests can be approved
  if (adminRequest.status !== "VERIFIED") {
    throw createError(
      "Verify this request before approving it",
      400
    );
  }

  // Check whether an account already exists
  const duplicateConditions = [
    { email: adminRequest.email },
  ];

  if (adminRequest.mobile) {
    duplicateConditions.push({
      mobile: adminRequest.mobile,
    });
  }

  const existingUser = await User.findOne({
    $or: duplicateConditions,
  });

  if (existingUser) {
    throw createError(
      "An account with this email or mobile already exists",
      409
    );
  }

  let createdUser;
  let organization;

  try {
    // 1. Create Organization Admin account
    createdUser = await User.create({
      name: adminRequest.name,
      email: adminRequest.email,
      mobile: adminRequest.mobile,

      role: "ADMIN",
      accountType: "STUDENT",
      adminType: "ORGANIZATION_ADMIN",

      // Request email has already been verified
      isVerified: true,

      // Explicit active status
      adminStatus: "ACTIVE",

      password: adminRequest.password,
    });

    // 2. Create Organization
    organization = await Organization.create({
      name: adminRequest.organizationName,
      owner: createdUser._id,
      organizationType: adminRequest.organizationType,
      description: adminRequest.description || "",
      logo: adminRequest.logo || {},
      status: "ACTIVE",
    });

    // 3. Link Organization with Admin
    createdUser.organizationId = organization._id;

    await createdUser.save();

    // 4. Update Admin Request
    adminRequest.status = "APPROVED";
    adminRequest.reviewedBy = superAdminId;
    adminRequest.reviewedAt = new Date();

    adminRequest.createdAdmin = createdUser._id;
    adminRequest.organization = organization._id;

    adminRequest.verificationTokenHash = null;
    adminRequest.verificationTokenExpiresAt = null;

    await adminRequest.save();

    // 5. Return created data
    return {
      admin: {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        mobile: createdUser.mobile,

        role: createdUser.role,
        adminType: createdUser.adminType,
        adminStatus: createdUser.adminStatus,

        organizationId: createdUser.organizationId,
        isVerified: createdUser.isVerified,
      },

      organization,

      request: safeRequest(adminRequest),
    };

  } catch (error) {
    // Rollback if anything fails
    if (organization?._id) {
      await Organization.findByIdAndDelete(
        organization._id
      );
    }

    if (createdUser?._id) {
      await User.findByIdAndDelete(
        createdUser._id
      );
    }

    throw error;
  }
};


// 6. Reject pending or verified requests
export const rejectAdminRequest = async ({
  requestId,
  superAdminId,
  rejectionReason,
}) => {
  const adminRequest = await AdminRequest.findOneAndUpdate(
    {
      _id: requestId,
      status: { $in: ["PENDING", "VERIFIED"] },
    },
    {
      $set: {
        status: "REJECTED",
        reviewedBy: superAdminId,
        reviewedAt: new Date(),
        rejectionReason: rejectionReason || null,
        verificationTokenHash: null,
        verificationTokenExpiresAt: null,
      },
    },
    { new: true, runValidators: true }
  );

  if (!adminRequest) {
    throw createError("Pending or verified request not found", 404);
  }

  return safeRequest(adminRequest);
};

export const getPendingAdminRequests = async () => {
  return AdminRequest.find({
    status: { $in: ["PENDING", "VERIFIED"] },
  })
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();
};