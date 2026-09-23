import mongoose from "mongoose"
import config from "../config/config.js"

const db = async ()=>{
    try {
       await mongoose.connect(config.MONGO_URI)
        console.log("dataabse connected successfully");
    } catch (error) {
        console.log("error",error);  
    }
}

export default db