const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

const userRoutes = require("./routes/userRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");
const courseRoutes = require("./routes/courseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const subjectRoutes = require("./routes/subjectRoutes");

const attendanceRoutes = require("./routes/attendanceRoutes");

const assignmentRoutes = require("./routes/assignmentRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();
app.use(helmet());

// CORS allowlist. Set FRONTEND_URL (and optionally CORS_EXTRA_ORIGINS, a
// comma-separated list) in the environment to restrict which origins may call
// this API. With neither set we fall back to allowing every origin, so local
// development and the existing deployment keep working — but that is not a
// safe production posture, hence the warning.
const allowedOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.CORS_EXTRA_ORIGINS || "").split(","),
]
  .filter(Boolean)
  .map((o) => o.trim().replace(/\/$/, ""));

if (allowedOrigins.length > 0) {
  app.use(cors({ origin: allowedOrigins, credentials: true }));
} else {
  console.warn(
    "[cors] FRONTEND_URL is not set — allowing all origins. Set it in production."
  );
  app.use(cors());
}
app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "CampusIQ 360 API is running",
    });
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/subjects", subjectRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(errorMiddleware);
module.exports = app;