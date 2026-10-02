import express from "express";
import registerUser from "../controllers/auth.controllers.js";
import userValidation from "../validators/auth.validator.js";

const router = express.Router();


router.post("/register", userValidation, registerUser);

export default router;