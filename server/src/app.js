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

app.use(cors());
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