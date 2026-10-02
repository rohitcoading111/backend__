import userModel from "../models/user.models.js";
import bcrypt from "bcrypt";
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