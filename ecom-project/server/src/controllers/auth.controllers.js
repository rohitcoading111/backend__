import userModel from "../models/user.model.js"

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

}