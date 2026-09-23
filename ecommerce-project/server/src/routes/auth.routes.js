import express from "express"
import {registerValidation} from "../validators/auth.validator.js"
import {registerController} from "../controllers/auth.controllers.js"
const router = express.Router()

router.post("/register" ,registerValidation,registerController)

export default router