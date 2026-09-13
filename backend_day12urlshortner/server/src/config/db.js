import mongoose from "mongoose";
import config from "./config.js";
const connectDB = async()=>{
    await mongoose.connect(config.MONGO_URI)
    console.log("database has been connecteed ");
    
}

export default connectDB