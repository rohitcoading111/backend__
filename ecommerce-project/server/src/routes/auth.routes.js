import express from "express"
import {registerValidation,loginValidator} from "../validators/auth.validator.js"
import {registerController,loginController} from "../controllers/auth.controllers.js"
const router = express.Router()

router.post("/register" ,registerValidation,registerController)
router.post("/login",loginValidator,loginController)

export default router