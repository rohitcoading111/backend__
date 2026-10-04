import dotenv from "dotenv";
dotenv.config();

const config = {
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    ADMIN_NAME: process.env.ADMIN_NAME,
    ADMIN_EMAIL:process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD:process.env.ADMIN_PASSWORD,
    INSTRUCTOR_NAME: process.env.INSTRUCTOR_NAME,
    INSTRUCTOR_EMAIL:process.env.INSTRUCTOR_EMAIL,
    INSTRUCTOR_PASSWORD:process.env.INSTRUCTOR_PASSWORD
};

export default config;
