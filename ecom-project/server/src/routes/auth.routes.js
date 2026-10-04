import express from 'express';
import { registerValidator, loginValidator } from '../auth.validator.js';
import { register, login } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);

export default router