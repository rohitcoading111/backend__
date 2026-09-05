import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minLength : 3
    },
    email:{
        type:String,
        required:true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password:{
        type:String,
        required:true
    }
});

const user = mongoose.model("user", userSchema);

export default user;