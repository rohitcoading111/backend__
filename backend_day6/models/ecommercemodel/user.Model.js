import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:Number,
        required:true,
        minlength:10
    },
    address:{
        type:String,
    },
    gender:{
        type:String,
        enum: ["MALE","FEMALE","OTHERS"],
        required: true
    }
},{timestamps:true})


export const User = mongoose.model("User",userSchema)