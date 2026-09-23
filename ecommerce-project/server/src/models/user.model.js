import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    
},{
        timestamps:true
    })

const userModel = mongoose.model("userModel",userSchema)

export default userModel