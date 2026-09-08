import { Router } from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/auth.js";
const router = Router();

router.post("/register",async(req,res)=>{
    const {name,email,password} = req.body;
    const isUser = await userModel.findOne({email});
    if(isUser){
        return res.status(400).json({message:"User already exists"});
        errors:[
           {
            param: "email",
            msg: "User already exists"
           }
        ]
        
    }
    const user = await userModel.create({name,email,passwordHash: await bcrypt.hash(password,12)});
    const {accessToken, refreshToken} = generateAccessToken({userId: user._id});
    res.cookie("refreshToken", refreshToken, {httpOnly: true,});
    return res.status(201).json({message:"User created successfully",user});
});

export default router;