const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");

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

module.exports = app;