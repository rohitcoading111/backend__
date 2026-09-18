import express from "express"
import {urlChecker,urlDelete, urlFind, urlRedirect} from "../controllers/url.controllers.js"

const router = express.Router();

router.post('/shorten', urlChecker)
app.get("/allurls" , urlFind)
app.get("/:code" , urlRedirect)
app.delete("/:code" ,urlDelete)


export default router;