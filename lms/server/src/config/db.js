import mongoose from "mongoose";
import config from "./config.js";

const db = async () => {
  if (!config.MONGO_URI) {
    throw new Error("MONGO_URI is required to connect to MongoDB");
  }

  await mongoose.connect(config.MONGO_URI);
  console.log("db has been connected");
};

export default db;