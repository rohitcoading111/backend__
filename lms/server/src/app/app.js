import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from "../routes/admin.routes.js";
import courseRoutes from "../routes/cource.routes.js";
import moduleRoutes from "../routes/module.routes.js";

const app = express();
app.use(cookieParser());
app.use(express.json());


// auth apis 
app.use('/api/auth', authRoutes);

//admin apis
app.use("/api/admin", adminRoutes);

// cources apis 
app.use("/api/courses", courseRoutes);

// module apis 
app.use("/api/modules", moduleRoutes);

export default app;