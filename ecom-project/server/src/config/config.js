import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const config = {
    MONGO_URI : process.env.MONGO_URI,
    ACCESS_TOKEN_SECREATE: process.env.ACCESS_TOKEN_SECREATE,
    REFRESH_TOKEN_SECREATE:process.allowedNodeEnvironmentFlags.REFRESH_TOKEN_SECREATE
}

export default config