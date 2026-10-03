import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const authMiddleware = (req, res, next) => {
     const token  = req.headers.authorization?.split(" ")[1];
     if(!token){
        return res.status(401).json({
            message:"access denied no token porvided",
        })
     }

     const decoded = jwt.verify(token,config.ACCESS_TOKEN_SECRET);
     req.user = decoded;
     next();
};