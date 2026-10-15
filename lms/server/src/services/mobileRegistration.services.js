
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
