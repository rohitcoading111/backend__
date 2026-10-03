import userModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken } from "../utils/auth.utils.js";

export const registerUser = async (user)=>{
    const { email, password } = user;
    const existingUser = await userModel.findOne({email});
    if(existingUser){
       throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
        name: user.name,
        email,
        password: hashedPassword,
        avatar: user.avatar,
    })
    const savedUser = await newUser.save();
    const accessToken = generateAccessToken(savedUser);
    const refreshToken = generateRefreshToken(savedUser);
    savedUser.refreshToken = refreshToken;
    await savedUser.save();
    return { accessToken, refreshToken };
}

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