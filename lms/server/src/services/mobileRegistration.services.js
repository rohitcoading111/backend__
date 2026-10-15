import bcrypt from "bcrypt";

import userModel from "../models/user.models.js";
import PendingRegistration from "../models/pendingRegistration.models.js";

import {
  sendMobileOTP,
  verifyMobileOTP,
} from "./otp.services.js";


export const startMobileRegistration = async ({
  name,
  mobile,
  password,
}) => {
  // 1. Name aur mobile ko normalize karo
  const normalizedName = name?.trim();
  const normalizedMobile = mobile?.trim();

  // 2. Required fields check karo
  if (!normalizedName || !normalizedMobile || !password) {
    throw new Error("Name, mobile and password are required");
  }

  // 3. International format check karo, example: +919876543210
  if (!/^\+[1-9]\d{7,14}$/.test(normalizedMobile)) {
    throw new Error("Enter mobile number with country code, e.g. +919876543210");
  }

  // 4. Check karo ki mobile se account pehle se bana hai ya nahi
  const existingUser = await userModel.findOne({
    mobile: normalizedMobile,
  });

  if (existingUser) {
    throw new Error("Mobile number is already registered");
  }

  // 5. Password ko hash karo; plain password save nahi karna
  const hashedPassword = await bcrypt.hash(password, 10);

  // 6. OTP verification ke liye pending registration data banao
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  await PendingRegistration.findOneAndUpdate(
    { mobile: normalizedMobile },
    {
      name: normalizedName,
      mobile: normalizedMobile,
      password: hashedPassword,
      expiresAt,
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
    }
  );

  // 7. Twilio se SMS OTP bhejo
  const otpStatus = await sendMobileOTP(normalizedMobile);

  // 8. OTP response mein mat bhejna
  return {
    message: "OTP sent successfully",
    mobile: normalizedMobile,
    otpStatus,
  };
};

export const completeMobileRegistration = async ({
  mobile,
  code,
}) => {
  const normalizedMobile = mobile?.trim();
  const normalizedCode = String(code ?? "").trim();

  // 1. Required fields check karo
  if (!normalizedMobile || !normalizedCode) {
    throw new Error("Mobile number and OTP are required");
  }

  // 2. Pending registration find karo
  const pendingUser = await PendingRegistration.findOne({
    mobile: normalizedMobile,
  });

  if (!pendingUser) {
    throw new Error("No pending registration found");
  }

  // 3. Expiry manually check karo
  if (pendingUser.expiresAt <= new Date()) {
    await PendingRegistration.deleteOne({
      _id: pendingUser._id,
    });

    throw new Error("Registration expired. Please register again");
  }

  // 4. Twilio se OTP verify karo
  let isVerified = false;

  try {
    isVerified = await verifyMobileOTP(
      normalizedMobile,
      normalizedCode
    );
  } catch {
    throw new Error("Invalid or expired OTP");
  }

  // 5. OTP valid nahi hai toh account create mat karo
  if (!isVerified) {
    throw new Error("Invalid or expired OTP");
  }

  // 6. Permanent account pehle se toh nahi bana?
  const existingUser = await userModel.findOne({
    mobile: normalizedMobile,
  });

  if (existingUser) {
    await PendingRegistration.deleteOne({
      _id: pendingUser._id,
    });

    throw new Error("Mobile number is already registered");
  }

  // 7. OTP verified hai, ab permanent User create karo
  const newUser = await userModel.create({
    name: pendingUser.name,
    mobile: pendingUser.mobile,
    password: pendingUser.password,
    avatar: pendingUser.avatar,
    mobileVerified: true,
  });

  // 8. Account create hone ke baad pending record delete karo
  await PendingRegistration.deleteOne({
    _id: pendingUser._id,
  });

  // 9. Safe user details return karo
  return {
    message: "Mobile verified and account created successfully",
    user: {
      id: newUser._id,
      name: newUser.name,
      mobile: newUser.mobile,
      mobileVerified: newUser.mobileVerified,
    },
  };
};

