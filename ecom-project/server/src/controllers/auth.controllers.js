import bcrypt from "bcryptjs"
import userModel from "../models/user.model.js"
import {createAccessToken,createRefreshToken} from "../utils/auth.utils.js"


const register = async(req ,res)=>{
    const {email,name,password }  = req.body
    const isUserAlreadyExist = await userModel.findOne({
        email
    })
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"user already exists",
            errors:[
                {
                    field:"email",
                    message:"user already eexists "
                }
            ]
        })
    }

    const user = await userModel.create({
        email,
        name,
        passwordHash  :await bcrypt.hash(password,12)
    })

    const accessToken = createAccessToken({
        userId:user._id,
        role:user.role
    })
    const refreshToken = createRefreshToken({
        userId:user._id,
        role:user.role
    })

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true
    })

    await userModel.findByIdAndUpdate(user._id,{
        refreshToken
    })
  
    res.status(201).json({
        message:"user reegister succcessfully",
        data:{
            user:{
                email:user.email,
                name:user.name,
                id:user._id
            },
            accessToken
        }
    })

}

const login  = async(req,res)=>{
    const {email,password} = req.body
    const user = await userModel.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }
    
}

export default register