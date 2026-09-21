import express from 'express'
import registerValidator from '../validators/auth.validator';

const router = express.Router();

router.post("/login",registerValidator,)

export default router;