const express = require("express");
const app = express();

app.use(express.json());

app.get("/api/health", (req,res) => {
    res.status(200).json({
        sucess: true,
        message: "CampusIQ 360 API is running",
    })
});

module.exports = app;