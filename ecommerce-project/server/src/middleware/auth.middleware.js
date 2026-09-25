import config from "../config/config.js"
import jwt from "jsonwebtoken"

import jwt from "jsonwebtoken";
import config from "../config/config.js";

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