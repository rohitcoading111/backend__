
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";

import authRoutes from '../routes/auth.routes.js';
import adminRoutes from "../routes/admin.routes.js";
import courseRoutes from "../routes/cource.routes.js";
import moduleRoutes from "../routes/module.routes.js";
import lectureRoutes from "../routes/lecture.routes.js";
import enrollmentRoutes from "../routes/enrollment.routes.js";
import paymentRoutes from "../routes/payment.routes.js";
import passport from '../config/googleStrategy.js';
import liveSessionRoutes from "../routes/liveSession.routes.js";
import progressRoutes from "../routes/progress.routes.js";
import organizationRoutes from "../routes/organization.routes.js";
import adminRequestRoutes from "../routes/adminRequest.routes.js";
import organizationInstructorRoutes from "../routes/organizationInstructor.routes.js";
import paymentAnalyticsRoutes from "../routes/paymentAnalytics.routes.js";
import organizationBankDetailsRoutes from "../routes/organizationBankDetails.routes.js";
import organizationPolicyAcceptanceRoutes from "../routes/organizationPolicyAcceptance.routes.js";
import chatRoutes from "../routes/chat.routes.js";

// Global rate limiter
import { globalApiLimiter } from "../middleware/globalRateLimit.middleware.js";

const app = express();

app.use(cookieParser());
app.use(express.json());

const configuredOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

const allowedOrigins = [
  "http://localhost:5173",
  "https://learnhubcloud.in",
  ...configuredOrigins,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Apply global rate limiter to all API routes
app.use("/api", globalApiLimiter);

app.use(passport.initialize());

// Auth APIs
app.use('/api/auth', authRoutes);

// Admin APIs
app.use("/api/admin", adminRoutes);

// Courses APIs
app.use("/api/courses", courseRoutes);

// Module APIs
app.use("/api/modules", moduleRoutes);

// Lecture routes
app.use("/api", lectureRoutes);

// Enrollment routes
app.use("/api/enrollments", enrollmentRoutes);

// Payment routes
app.use("/api/payments", paymentRoutes);

// Live session routes
app.use("/api/live-sessions", liveSessionRoutes);

app.use("/api/progress", progressRoutes);

app.use("/api/organization", organizationInstructorRoutes);

app.use("/api/admin-requests", adminRequestRoutes);

app.use("/api/organizations", organizationRoutes);

app.use("/api/payment-analytics", paymentAnalyticsRoutes);

app.use("/api/organization-bank-details", organizationBankDetailsRoutes);

app.use("/api/organization-policies", organizationPolicyAcceptanceRoutes);

app.use("/api/chat", chatRoutes);

export default app;
