import express from "express"
import {registerValidation,loginValidator} from "../validators/auth.validator.js"
import {registerController,loginController,refreshTokenController,logoutController,meController} from "../controllers/auth.controllers.js"
import {authMiddleware} from "../middleware/auth.middleware.js"
const router = express.Router()

router.post("/register" ,registerValidation,registerController)
router.post("/login",loginValidator,loginController)
router.post("/refresh",refreshTokenController)
router.post("/logout", logoutController);
router.get("/me", authMiddleware, meController);

export default router