import dotenv from "dotenv"
dotenv.config()

const config = {
    MONGO_URI : process.env.MONGO_URI,
    ACCESS_TOKEN : process.env.ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    Public_Key:process.env.IMAGEKIT_PUBLIC_KEY,
    Private_Key:process.env.IMAGEKIT_PRIVATE_KEY,
    Url_Endpoint:process.env.IMAGEKIT_URL_ENDPOINT
}


export default config