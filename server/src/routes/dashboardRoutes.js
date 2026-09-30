const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboard,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getDashboard
);

module.exports = router;