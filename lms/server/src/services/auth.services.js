import userModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.utils.js";
import imagekit from "../config/imagekit.js";



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
  let avatarData = {
    url: null,
    fileId: null,
  };

  // 7. Upload the avatar to ImageKit if a file was provided
  if (file) {
    const uploadResponse = await imagekit.files.upload({
      file: file.buffer.toString("base64"),
      fileName: `${Date.now()}-${file.originalname}`,
      folder: "/lms/avatars",
    });

    // Save the uploaded avatar's URL and file ID
    avatarData = {
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
    };
  }

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