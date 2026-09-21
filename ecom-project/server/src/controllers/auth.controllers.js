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
    

}

export default register