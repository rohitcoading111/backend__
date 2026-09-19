import express from "express"
import router from "../routes/url.routes.js";
import cors from "cors";


const app = express();
app.use(cors())
app.use(express.json());

app.use("/api/url",router)


export default app;