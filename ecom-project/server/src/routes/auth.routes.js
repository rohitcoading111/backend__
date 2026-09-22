import express from 'express'
import registerValidator from '../validators/auth.validator.js';
import register from '../controllers/auth.controllers.js';

const router = express.Router();

router.post("/login",registerValidator,register)

export default router;