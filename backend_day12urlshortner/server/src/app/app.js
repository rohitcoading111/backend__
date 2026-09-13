import express from "express"
import urlRoutes from "../routes/url.routes.js"
const app = express();

app.use("/api/url",urlRoutes)
export default app;