import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export const generateAccessToken = ({userId}) => {
    const accessToken = jwt.sign({userId}, config.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
    const refreshToken = jwt.sign({userId}, config.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
    return {accessToken, refreshToken};
}