import mongoose from "mongoose";
import config from "./config.js";

const db = async ()=>{
     try {
      await mongoose.connect(config.MONGO_URI)
      console.log("db has been connected");
      
     } catch (error) {
         console.log(error);
     }
}

export default db