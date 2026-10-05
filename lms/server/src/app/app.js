import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from "../routes/admin.routes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/admin", adminRoutes);


export default app;