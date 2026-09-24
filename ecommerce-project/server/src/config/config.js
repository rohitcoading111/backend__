import dotenv from "dotenv"
dotenv.config()

const config = {
    MONGO_URI : process.env.MONGO_URI,
    ACCESS_TOKEM : process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN
}


export default config