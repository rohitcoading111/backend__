import express from "express"
import router from "../routes/url.routes.js";
import {urlDelete, urlFind, urlRedirect} from "../controllers/url.controllers.js"


const app = express();
app.use(express.json());

app.use("/api/url",router)

app.get("/allurls" , urlFind)

app.get("/:code" , urlRedirect)

app.delete("/:code" ,urlDelete)


export default app;