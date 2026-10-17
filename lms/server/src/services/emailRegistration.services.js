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

  const newUser = await User.create({
    name: pending.name,
    email: normalizedEmail,
    password: pending.password,
    avatar: pending.avatar,
    isVerified: true,
  });

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  newUser.refreshToken = refreshToken;
  await newUser.save();
  await sendRegistrationNotification({
  email: newUser.email,
  name: newUser.name,
});

  await PendingRegistration.deleteOne({ _id: pending._id });

  return {
    message: "Email verified and registration successful",
    accessToken,
    refreshToken,
    user: newUser,
  };
};
