import express from 'express'
import registerValidator from '../validators/auth.validator';
import register from '../controllers/auth.controllers';

const router = express.Router();

router.post("/login",registerValidator,register)

export default router;