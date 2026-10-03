import express from "express";
import registerUser from "../controllers/auth.controllers.js";
import userValidation from "../validators/auth.validator.js";
import { LoginValidation } from "../validators/auth.validator.js";
import {Login} from "../controllers/auth.controllers.js";
import {RefreshToken} from "../controllers/auth.controllers.js";

const router = express.Router();


router.post("/register", userValidation, registerUser);
router.post("/login", LoginValidation, Login);
router.post("/refresh", RefreshToken);

export default router;