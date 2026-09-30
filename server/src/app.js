const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

const userRoutes = require("./routes/userRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");
const courseRoutes = require("./routes/courseRoutes");
// const dashboardRoutes = require("./routes/dashboardRoutes");
const subjectRoutes = require("./routes/subjectRoutes");

const attendanceRoutes = require("./routes/attendanceRoutes");

const assignmentRoutes = require("./routes/assignmentRoutes");
const timetableRoutes = require("./routes/timetableRoutes");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "CampusIQ 360 API is running",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/users", userRoutes);

app.use("/api/courses", courseRoutes);
// app.use("/api/dashboard", dashboardRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/timetables", timetableRoutes);
app.use("/api/events", eventRoutes);
app.use(errorMiddleware);
module.exports = app;