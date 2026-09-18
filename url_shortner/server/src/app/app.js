import express from "express"
import router from "../routes/url.routes.js";
import {urlRedirect} from "../controllers/url.controllers.js"


const app = express();
app.use(express.json());

app.use("/api/url",router)


app.get("/:code" , urlRedirect)

export default app;