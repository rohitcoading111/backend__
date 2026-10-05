import userModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.utils.js";
import imagekit from "../config/imagekit.js";


export const registerUser = async (user) => {
  const { email, password, name, avatar, file } = user;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let avatarData = {
    url: null,
    fileId: null,
  };

  if (file) {
    const uploadResponse = await imagekit.files.upload({
      file: file.buffer,
      fileName: `${Date.now()}-${file.originalname}`,
      folder: "/lms/avatars",
    });

    avatarData = {
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
    };
  }

  const newUser = await userModel.create({
    name,
    email,
    password: hashedPassword,
    avatar: avatarData,
  });

  const accessToken = generateAccessToken(newUser);
  const refreshToken = generateRefreshToken(newUser);

  newUser.refreshToken = refreshToken;

  await newUser.save();

  return {
    accessToken,
    refreshToken,
  };
};
export const LoginUser = async (user)=>{
    const { email, password } = user;
    const existingUser = await userModel.findOne({email});
    if(!existingUser ){
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordValid){
        throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    return { accessToken, refreshToken };
}

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