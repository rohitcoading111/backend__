import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from '../routes/auth.routes.js';
import adminRoutes from "../routes/admin.routes.js";
import courseRoutes from "../routes/cource.routes.js";
import moduleRoutes from "../routes/module.routes.js";
import lectureRoutes from "../routes/lecture.routes.js";
import enrollmentRoutes from "../routes/enrollment.routes.js";
import paymentRoutes from "../routes/payment.routes.js"
import passport from '../config/googleStrategy.js';
import liveSessionRoutes from "../routes/liveSession.routes.js";

import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(passport.initialize()); 
// auth apis 
app.use('/api/auth', authRoutes);

//admin apis
app.use("/api/admin", adminRoutes);

// cources apis 
app.use("/api/courses", courseRoutes);

// module apis 
app.use("/api/modules", moduleRoutes);

// lecture routes
app.use("/api", lectureRoutes);

// enrollenment routes
app.use("/api/enrollments", enrollmentRoutes);

// payenment routes 
app.use("/api/payments", paymentRoutes);

// live session route 
app.use("/api/live-sessions", liveSessionRoutes);

export default app;