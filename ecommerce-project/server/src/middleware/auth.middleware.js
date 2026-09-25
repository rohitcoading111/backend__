import config from "../config/config.js"
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";


export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        const token = authHeader?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Access token is required"
            });
        }

        const verifyToken = jwt.verify(
            token,
            config.ACCESS_TOKEN
        );

        req.userId = verifyToken.userId;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired access token"
        });
    }
};


export const sellerMiddleware = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        if (user.role !== "seller") {
            return res.status(403).json({
                message: "Only seller can create product"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};