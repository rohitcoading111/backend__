import jwt from "jsonwebtoken"
import config from "../config/config.js"


export function createAccessToken({userId,role}){
    const accessToken  =jwt.sign({
        userId,
        role
    },config.ACCESS_TOKEN_SECREATE,{expiresIn:"15Min"})

    return createAccessToken
}



export function createRefreshToken({userId,role}){
    const accessToken  =jwt.sign({
        userId,
        role
    },config.ACCESS_TOKEN_SECREATE,{expiresIn:"7Days"})
    return createRefreshToken
}