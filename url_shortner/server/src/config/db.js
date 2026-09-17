import mongoose from "mongoose"
import config from "./config.js"

const db = async ()=>{
    try {
       await mongoose.connect(config.MONGO_URI)
       console.log("mongo db connected successfully")
    } catch (error) {
        console.log("connection failed")
    };
}
export default db