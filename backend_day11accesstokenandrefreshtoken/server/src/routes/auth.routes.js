import { Router } from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateAccessToken,verifyAccessToken,verifyRefreshToken } from "../utils/auth.js";
const router = Router();

router.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    const isUser = await userModel.findOne({email});
    if(isUser){
        return res.status(400).json({message:"User already exists",
         errors:[
           {
            path: "email",
            msg: "User already exists"
           }
        ]

        });
        
    }
    const user = await userModel.create({name,email,passwordHash: await bcrypt.hash(password,12)});
    const {accessToken, refreshToken} = generateAccessToken({userId: user._id});

    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {httpOnly: true,});
    return res.status(201).json({message:"User created successfully",name:user.name,email:user.email,accessToken});
});

router.get("/me", async (req, res) => {
    const accesstoken = req.headers.authorization?.split(" ")[1];
    try {
        const decoded = verifyAccessToken(accesstoken);
        const user = await userModel.findById(decoded.userId)
        res.status(200).json({message:"User fetched successfully",name:user.name,email:user.email});
    } catch (error) {
        return res.status(401).json({message:"Invalid access token"});
    }
});

router.post("/refresh", async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({message:"Refresh token not found"});
    }
    try {
      const decoded = await verifyRefreshToken(refreshToken);
      const user = await userModel.findById(decoded.userId);

      if (refreshToken !== user.refreshToken) {
    user.refreshToken = null;
    await user.save();

    return res.status(401).json({
        message: "Invalid refresh token"
    });
}

const { accessToken, refreshToken: newRefreshToken } =
    generateAccessToken({ userId: user._id });

res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
});

user.refreshToken = newRefreshToken;
await user.save();

return res.status(200).json({
    message: "Access token refreshed successfully",
    accessToken
});
    } 
    catch (error) {
        return res.status(401).json({message:"Invalid refresh token"});
    }
    
});

export default router;