import userModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.utils.js";
import imagekit from "../config/imagekit.js";
import { sendMobileOTP } from "./otp.services.js";



export const registerUser = async (user) => {
  const { email, mobile, password, name, file } = user;

  // Email aur mobile ko normalize karo
  const normalizedEmail = email?.trim().toLowerCase() || undefined;
  const normalizedMobile = mobile?.trim() || undefined;

  // Kam se kam ek identifier zaroori hai
  if (!normalizedEmail && !normalizedMobile) {
    throw new Error("Email or mobile number is required");
  }

  // Duplicate email ya mobile check karo
  const existingUser = await userModel.findOne({
    $or: [
      ...(normalizedEmail ? [{ email: normalizedEmail }] : []),
      ...(normalizedMobile ? [{ mobile: normalizedMobile }] : []),
    ],
  });

  if (existingUser) {
    throw new Error("Email or mobile number already exists");
  }

  // Password ko hash karo
  const hashedPassword = await bcrypt.hash(password, 10);

  // Default avatar
  let avatarData = { url: null, fileId: null };

  // Agar avatar upload hua hai, toh ImageKit par bhejo
  if (file) {
    const uploadResponse = await imagekit.files.upload({
      file: file.buffer.toString("base64"),
      fileName: `${Date.now()}-${file.originalname}`,
      folder: "/lms/avatars",
    });

    avatarData = {
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
    };
  }

  // Naya user create karo
  const newUser = await userModel.create({
    name,
    email: normalizedEmail,
    mobile: normalizedMobile,
    password: hashedPassword,
    avatar: avatarData,
    mobileVerified: false,
  });

  // Mobile registration: OTP bhejo, JWT abhi mat do
  if (normalizedMobile) {
    try {
      const otpStatus = await sendMobileOTP(normalizedMobile);

      return {
        message: "Registration successful. Verify your mobile number.",
        mobile: normalizedMobile,
        otpStatus,
        requiresOTPVerification: true,
      };
    } catch (error) {
      // OTP request fail ho toh incomplete account remove karo
      await userModel.deleteOne({ _id: newUser._id });
      throw new Error("Could not send OTP. Please try again.");
    }
  }

  // Email-only registration ka existing behavior filhaal rakho
  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  newUser.refreshToken = refreshToken;
  await newUser.save();

  return {
    accessToken,
    refreshToken,
    newUser,
  };
};


export const LoginUser = async (user) => {
  // 1. Extract email, mobile number and password
  const { email, mobile, password } = user;

  // 2. Normalize the email and mobile number
  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedMobile = mobile?.trim();

  // 3. Require either email or mobile number
  if (!normalizedEmail && !normalizedMobile) {
    throw new Error("Email or mobile number is required");
  }

  // 4. Find the user using email OR mobile number
  const existingUser = await userModel.findOne({
    $or: [
      ...(normalizedEmail ? [{ email: normalizedEmail }] : []),
      ...(normalizedMobile ? [{ mobile: normalizedMobile }] : []),
    ],
  });

  // 5. Reject login if the user does not exist
  if (!existingUser) {
    throw new Error("Invalid email or password");
  }

  // 6. Compare the entered password with the stored password hash
  const isPasswordValid = await bcrypt.compare(
    password,
    existingUser.password
  );

  // 7. Reject login if the password is incorrect
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // 8. Generate JWT access and refresh tokens
  const accessToken = generateAccessToken(existingUser);
  const refreshToken = generateRefreshToken(existingUser);

  // 9. Save the refresh token on the user document
  existingUser.refreshToken = refreshToken;
  await existingUser.save();

  // 10. Return tokens to the controller
  return {
    accessToken,
    refreshToken,
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