import express from "express";
import authRoute from "../routes/auth.routes.js";
import productRouter from "../routes/product.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "https://backend-3-5swr.onrender.com/",
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api", productRouter);

export default app;