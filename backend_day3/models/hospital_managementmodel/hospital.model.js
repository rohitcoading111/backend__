import mongoose from "mongoose";

const HospitalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pinCode:{
        type:String,
    },
    specializedIn:[{
        tyepe:String,
    }],

},{timestamps:true});

export const Hospital = mongoose.model("Hospital", hospitalSchema);
