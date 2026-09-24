import config from "../config/config.js"
import jwt from "jsonwebtoken";

export const generateAccesToken = (user)=>{
  const accessToken = jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn:"15m" }
)
return accessToken
}

