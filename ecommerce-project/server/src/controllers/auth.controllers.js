import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateAccessToken,generateRefreshToken} from "../utils/auth.utils.js"
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await userModel.findOne({
            email
        });

        if (user) {
            return res.status(409).json({
                message: "user already exists"
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = await userModel.create({
            name,
            email,
            password: passwordHash
        });
    
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);  

        await userModel.findByIdAndUpdate(newUser._id,{
           refreshToken
         }   
        )

        res.cookie("refreshToken", refreshToken, {
        httpOnly: true
        });

        return res.status(201).json({
            message: "user created successfully",
            data: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            accessToken
        });

    } catch (error) {
        console.log("REGISTER ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({
            email
        });

        if (!user) {
            return res.status(401).json({
                message: "user not found"
            });
        }

        const pass = await bcrypt.compare(password, user.password);

        if (!pass) {
            return res.status(401).json({
                message: "password is incorrect"
            });
        }

       const accessToken = generateAccessToken(user);
       const refreshToken = generateRefreshToken(user);

       await userModel.findByIdAndUpdate(user._id, {
         refreshToken
       });

       res.cookie("refreshToken", refreshToken, {
         httpOnly: true
      });

        return res.status(200).json({
            message: "user login successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            accessToken
        });

    } catch (error) {
        console.log("LOGIN ERROR:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const refreshTokenController = async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken;
        if (!incomingRefreshToken) {
            return res.status(401).json({
                message: "Refresh token is not found"
            });
        }

        const jwtVerify = jwt.verify(
            incomingRefreshToken,
            config.REFRESH_TOKEN
        );

        const userId = jwtVerify.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        if (user.refreshToken !== incomingRefreshToken) {
        return res.status(401).json({
        message: "Invalid refresh token"
       });
    }

        const accessToken = generateAccessToken(user);
      
        return res.status(200).json({
            message: "Access token refreshed successfully",
            accessToken
        });

    } catch (error) {
        console.log("REFRESH TOKEN ERROR:", error);

        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }
};

export const logoutController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Refresh token is not found"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            config.REFRESH_TOKEN
        );

        const userId = decoded.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        user.refreshToken = null;
        await user.save();

        res.clearCookie("refreshToken");

        return res.status(200).json({
            message: "Logout has been successful"
        });

    } catch (error) {
        console.log("LOGOUT ERROR:", error);

        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }
};