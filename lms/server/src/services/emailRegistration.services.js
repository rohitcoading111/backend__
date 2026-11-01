
import crypto from "node:crypto";
import User from "../models/user.models.js";
import PendingRegistration from "../models/pendingRegistration.models.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth.utils.js";

import { sendRegistrationNotification } from "./registrationNotification.services.js";



export const verifyEmailRegistration = async ({ email, code }) => {
  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail || !code) {
    throw new Error("Email and OTP are required");
  }

  const pending = await PendingRegistration.findOne({
    email: normalizedEmail,
  });

  if (!pending) {
    throw new Error("Registration not found or already completed");
  }

  if (pending.expiresAt <= new Date()) {
    await PendingRegistration.deleteOne({ _id: pending._id });
    throw new Error("OTP expired. Please register again");
  }

  // Verify email OTP
  const submittedHash = crypto
    .createHash("sha256")
    .update(String(code))
    .digest("hex");

  if (
    !pending.emailOtpHash ||
    submittedHash !== pending.emailOtpHash
  ) {
    throw new Error("Invalid OTP");
  }

  // Check existing account
  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    await PendingRegistration.deleteOne({ _id: pending._id });
    throw new Error("Email already registered");
  }

  // Get selected role from pending registration
  const selectedRole = String(pending.role || "STUDENT")
    .trim()
    .toUpperCase();

  if (!["STUDENT", "INSTRUCTOR"].includes(selectedRole)) {
    throw new Error("INVALID_ROLE");
  }

  // Preserve existing account type
  const accountType = pending.accountType || "STUDENT";

  let userData = {
    name: pending.name,
    email: normalizedEmail,
    password: pending.password,
    avatar: pending.avatar,
    isVerified: true,

    role: selectedRole,
    accountType,
    sellerStatus: "NOT_APPLIED",
  };

  // Preserve existing Business profile and agreement
  if (accountType === "BUSINESS") {
    if (
      !pending.businessProfile?.businessName ||
      !pending.businessProfile?.businessType ||
      !pending.sellerAgreement?.version ||
      !pending.sellerAgreement?.acceptedAt
    ) {
      throw new Error("BUSINESS_REGISTRATION_DATA_INCOMPLETE");
    }

    userData = {
      ...userData,
      accountType: "BUSINESS",
      sellerStatus: "PENDING",

      businessProfile: {
        businessName: pending.businessProfile.businessName,
        businessType: pending.businessProfile.businessType,
      },

      sellerAgreement: {
        version: pending.sellerAgreement.version,
        acceptedAt: pending.sellerAgreement.acceptedAt,
      },
    };
  }

  // Generate permanent Instructor ID
  if (selectedRole === "INSTRUCTOR") {
    userData.instructorCode =
      `INS-${crypto.randomBytes(10).toString("hex").toUpperCase()}`;

    userData.employmentStatus = "INDEPENDENT";
    userData.organizationId = null;
    userData.hiredBy = null;
  }

  // Create actual User
  const newUser = await User.create(userData);

  // Generate authentication tokens
  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  newUser.refreshToken = refreshToken;
  await newUser.save();

  // Registration notification
  await sendRegistrationNotification({
    email: newUser.email,
    name: newUser.name,
  });

  // Delete completed pending registration
  await PendingRegistration.deleteOne({
    _id: pending._id,
  });

  return {
    message: "Email verified and registration successful",

    accessToken,
    refreshToken,

    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,

      role: newUser.role,
      instructorCode: newUser.instructorCode || null,

      accountType: newUser.accountType,
      sellerStatus: newUser.sellerStatus,
      businessProfile: newUser.businessProfile,

      employmentStatus: newUser.employmentStatus,
      organizationId: newUser.organizationId,
    },
  };
};

