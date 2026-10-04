import config from '../config/config.js';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (user) => {
    const accessToken = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    },config.ACCESS_TOKEN_SECRET, { expiresIn: config.ACCESS_TOKEN_EXPIRES_IN });
    return accessToken;
}

export const generateRefreshToken = (user) =>{
    const refreshToken = jwt.sign({
        id:user._id,
        email:user.email,
    },config.REFRESH_TOKEN_SECRET,{expiresIn :config.REFRESH_TOKEN_EXPIRES_IN})
    return refreshToken;
}