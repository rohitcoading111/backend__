import express from "express"
import {urlChecker,urlDelete, urlFind, urlRedirect} from "../controllers/url.controllers.js"

const router = express.Router();

router.post('/shorten', urlChecker)
router.get("/allurls" , urlFind)
router.get("/:code" , urlRedirect)
router.delete("/:code" ,urlDelete)


export default router;