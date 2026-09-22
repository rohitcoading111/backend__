import express from 'express'
import {registerValidator, loginValidator} from '../auth.validator.js';

import register from '../controllers/auth.controllers.js';

const router = express.Router();

router.post("/register",registerValidator,register)

router.post("/login",loginValidator)

export default router;