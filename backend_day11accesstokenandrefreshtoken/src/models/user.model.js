import mongoose from "mongoose";


const userSchema =  new mongoose.Schema({
   name:{
    type:String,
    required:true,
    minLength:[3, "Nmae must be atleast six characters long"],
    maxLength:[50, "Name can not be more than 30 characters long"]
   },
   email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
   },
   passwordHash: {
     type: String,
     required: true
   },
   refreshToken: {
    type: String,
    default: null
   }
})

const User = mongoose.model("User",userSchema)