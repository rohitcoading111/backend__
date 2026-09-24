import express from "express"
import {registerValidation,loginValidator} from "../validators/auth.validator.js"
import {registerController,loginController,refreshTokenController} from "../controllers/auth.controllers.js"
const router = express.Router()

router.post("/register" ,registerValidation,registerController)
router.post("/login",loginValidator,loginController)
router.post("/refresh",refreshTokenController)

export default router