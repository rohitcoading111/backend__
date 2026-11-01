
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

  const existingUser = await User.findOne({
    email: normalizedEmail,
  });

  if (existingUser) {
    await PendingRegistration.deleteOne({ _id: pending._id });
    throw new Error("Email already registered");
  }

  // Determine account type from trusted pending registration data.
  const accountType = pending.accountType || "STUDENT";

  let userData = {
    name: pending.name,
    email: normalizedEmail,
    password: pending.password,
    avatar: pending.avatar,
    isVerified: true,

    accountType,
  };

  // BUSINESS account creation.
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

      role: "INSTRUCTOR",
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
  } else {
    // Normal student account.
    userData = {
      ...userData,
      role: "STUDENT",
      sellerStatus: "NOT_APPLIED",
    };
  }

  const newUser = await User.create(userData);

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  newUser.refreshToken = refreshToken;
  await newUser.save();

  await sendRegistrationNotification({
    email: newUser.email,
    name: newUser.name,
  });

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
      accountType: newUser.accountType,
      sellerStatus: newUser.sellerStatus,
      businessProfile: newUser.businessProfile,
    },
  };
};
