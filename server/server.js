require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/database");

const PORT = process.env.PORT || 5000;

// Connect to Database first, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`CampusIQ 360 server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("Database connection failed:", err);
});