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
import progressRoutes from "../routes/progress.routes.js";
import organizationRoutes from "../routes/organization.routes.js";
import adminRequestRoutes from "../routes/adminRequest.routes.js";
import organizationInstructorRoutes from "../routes/organizationInstructor.routes.js";
import paymentAnalyticsRoutes from "../routes/paymentAnalytics.routes.js";
import organizationBankDetailsRoutes from "../routes/organizationBankDetails.routes.js";
import organizationPolicyAcceptanceRoutes from "../routes/organizationPolicyAcceptance.routes.js";
import chatRoutes from "../routes/chat.routes.js";

import cors from "cors";

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


app.use(passport.initialize()); 

// Temporary IP check - remove after testing
app.get("/api/debug/ip-check", (req, res) => {
  console.log("PROXY CHECK:", {
    forwardedFor: req.get("x-forwarded-for") || "Not received",
    cfConnectingIp: req.get("cf-connecting-ip") || "Not received",
    cfRay: req.get("cf-ray") || "Not received",
    expressIp: req.ip,
  });

  res.json({
    success: true,
    forwardedForReceived: Boolean(req.get("x-forwarded-for")),
    cfConnectingIpReceived: Boolean(req.get("cf-connecting-ip")),
    cfRayReceived: Boolean(req.get("cf-ray")),
  });
});
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

app.use("/api/progress", progressRoutes);

app.use("/api/organization", organizationInstructorRoutes);


app.use("/api/admin-requests", adminRequestRoutes);

app.use("/api/organizations", organizationRoutes);

app.use("/api/payment-analytics", paymentAnalyticsRoutes);

app.use("/api/organization-bank-details", organizationBankDetailsRoutes);
app.use("/api/organization-policies", organizationPolicyAcceptanceRoutes);

app.use("/api/chat", chatRoutes);
export default app;