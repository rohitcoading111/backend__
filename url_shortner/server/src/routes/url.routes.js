import express from "express"
import { urlChecker } from "../controllers/url.controllers.js";

const router = express.Router();

router.post('/', urlChecker)

export default router;