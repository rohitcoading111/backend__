import config from "../config/config.js"
import jwt from "jsonwebtoken";

export const generateAccessToken= (user)=>{
  const accessToken = jwt.sign(
    { userId: user._id },
    config.ACCESS_TOKEN,
    { expiresIn:"15m" }
)
return accessToken
}

export const generateRefreshToken = (user)=>{
    const refreshToken = jwt.sign({
        userId:user._id
    },config.REFRESH_TOKEN,
    {expiresIn:"7d"}
)
    return refreshToken
}