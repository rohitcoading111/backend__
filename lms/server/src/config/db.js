import mongoose from "mongoose";
import config from "./config.js";

const db = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("DB has been connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

export default db;
