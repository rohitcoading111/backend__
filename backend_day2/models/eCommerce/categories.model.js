import mongoose from "mongoosse";

const categorySchema = new mongoose.Schema({
     name:{
        type:String,
        required:true,
     }
},{timestamps: true});

export const Category = mongoose.model("Category",categorySchema);