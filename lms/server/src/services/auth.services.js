import userModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.utils.js";
import imagekit from "../config/imagekit.js";
import { startLoginOTP } from "./loginOTP.services.js";
import PendingLogin from "../models/pendingLogin.models.js";
import { verifyMobileOTP } from "./otp.services.js";

export const uploadAvatar = async (file) => {
  if (!file) {
    return {
      url: null,
      fileId: null,
    };
  }

  const uploadResponse = await imagekit.files.upload({
    file: file.buffer.toString("base64"),
    fileName: `${Date.now()}-${file.originalname}`,
    folder: "/lms/avatars",
  });

  return {
    url: uploadResponse.url,
    fileId: uploadResponse.fileId,
  };
};


export const registerUser = async (user) => {
  // 1. Extract registration data from the request
  const { email, mobile, password, name, avatar, file } = user;

  // 2. Normalize identifiers before checking the database
  const normalizedEmail = email?.trim().toLowerCase() || undefined;
  const normalizedMobile = mobile?.trim() || undefined;

  // 3. At least one identifier must be provided
  if (!normalizedEmail && !normalizedMobile) {
    throw new Error("Email or mobile number is required");
  }

  // 4. Check whether this email or mobile is already registered
  const existingUser = await userModel.findOne({
    $or: [
      ...(normalizedEmail ? [{ email: normalizedEmail }] : []),
      ...(normalizedMobile ? [{ mobile: normalizedMobile }] : []),
    ],
  });

  if (existingUser) {
    throw new Error("Email or mobile number already exists");
  }

  // 5. Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 6. Set default avatar values
  const avatarData = await uploadAvatar(file);

  // 8. Create the user in MongoDB
  const newUser = await userModel.create({
    name,
    email: normalizedEmail,
    mobile: normalizedMobile,
    password: hashedPassword,
    avatar: avatarData,
  });

  // 9. Generate JWT access and refresh tokens
  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  // 10. Save the refresh token on the user document
  newUser.refreshToken = refreshToken;
  await newUser.save();

  // 11. Return the registration result
  return {
    accessToken,
    refreshToken,
    newUser,
  };
};



export const LoginUser = async (user) => {
  const { email, mobile, password } = user;

  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedMobile = mobile?.trim();

  if (!normalizedEmail && !normalizedMobile) {
    throw new Error("Email or mobile number is required");
  }

  const existingUser = await userModel.findOne({
    $or: [
      ...(normalizedEmail ? [{ email: normalizedEmail }] : []),
      ...(normalizedMobile ? [{ mobile: normalizedMobile }] : []),
    ],
  });

  if (!existingUser) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // Login OTP ke liye registered mobile zaroori hai.
  if (!existingUser.mobile) {
    throw new Error("LOGIN_MOBILE_REQUIRED");
  }

  // Password correct hai, ab OTP send hoga.
  await startLoginOTP(existingUser);

  return {
    message: "Password verified. OTP sent to registered mobile.",
    mobile: existingUser.mobile,
  };
};


export const verifyLoginOTP = async ({ mobile, code }) => {
  const normalizedMobile = mobile?.trim();
  const normalizedCode = String(code ?? "").trim();

  if (!normalizedMobile || !normalizedCode) {
    throw new Error("Mobile and OTP are required");
  }

  const pendingLogin = await PendingLogin.findOne({
    mobile: normalizedMobile,
  });

  if (!pendingLogin) {
    throw new Error("LOGIN_SESSION_NOT_FOUND");
  }

  if (pendingLogin.expiresAt <= new Date()) {
    await PendingLogin.deleteOne({ _id: pendingLogin._id });
    throw new Error("LOGIN_SESSION_EXPIRED");
  }

  const existingUser = await userModel.findById(
    pendingLogin.userId
  );

  if (!existingUser || existingUser.mobile !== normalizedMobile) {
    await PendingLogin.deleteOne({ _id: pendingLogin._id });
    throw new Error("LOGIN_SESSION_NOT_FOUND");
  }

  const isOTPValid = await verifyMobileOTP(
    normalizedMobile,
    normalizedCode
  );

  if (!isOTPValid) {
    throw new Error("INVALID_LOGIN_OTP");
  }

  // OTP verified: ab tokens generate honge.
  existingUser.mobileVerified = true;

  const accessToken = generateAccessToken(existingUser);
  const refreshToken = generateRefreshToken(existingUser);

  existingUser.refreshToken = refreshToken;
  await existingUser.save();

  await PendingLogin.deleteOne({ _id: pendingLogin._id });

  return {
    accessToken,
    refreshToken,
    user: {
      id: existingUser._id,
      name: existingUser.name,
      email: existingUser.email,
      mobile: existingUser.mobile,
      role: existingUser.role,
      mobileVerified: existingUser.mobileVerified,
    },
  };
};


export const refreshTokenService = async (decoded, refreshToken) => {
  const { id, email } = decoded;

  const existingUser = await userModel.findById(id);

  if (!existingUser || existingUser.email !== email) {
    throw new Error("Invalid refresh token");
  }

  if (existingUser.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const accessToken = generateAccessToken(existingUser);

  return accessToken;
};

export const LogoutUser = async (refreshToken) => {

  const loggedOutUser = await userModel.findOneAndUpdate(
    { refreshToken: refreshToken },
    { $set: { refreshToken: null } },
    { new: true }
  );

  return loggedOutUser;
};