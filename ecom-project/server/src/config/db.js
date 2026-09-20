import mongoose from "mongoose"
import config from "./config.js"


const db = async ()=>{
  try {
    await mongoose.connect(config.MONGO_URI)
    console.log("db successfully connected");
  } catch (error) {
    console.log("errors",error);
  }
}

export default db
