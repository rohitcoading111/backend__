import express from "express";
import registerUser from "../controllers/auth.controllers.js";
import userValidation from "../validators/auth.validator.js";
import { LoginValidation } from "../validators/auth.validator.js";
import {Login} from "../controllers/auth.controllers.js";
import {RefreshToken} from "../controllers/auth.controllers.js";
import {Logout} from "../controllers/auth.controllers.js";
import { getMe } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { adminTest } from "../controllers/auth.controllers.js";
import { roleMiddleware } from "../middleware/role.middleware.js";
import upload from "../middleware/upload.middleawre.js";

const router = express.Router();


router.post("/register", upload.single("avatar"), userValidation, registerUser);
router.post("/login", LoginValidation, Login);
router.post("/refresh", RefreshToken);
router.post("/logout", Logout);
router.get("/me", authMiddleware, getMe);
router.get( "/admin-test",authMiddleware, roleMiddleware("ADMIN"),adminTest);


export default router;