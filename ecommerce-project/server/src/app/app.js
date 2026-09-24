import express from "express"
import authRoute from "../routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoute)
export default app;
