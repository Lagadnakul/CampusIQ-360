const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const { getProfile } = require("../controllers/userController");

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

router.get(
  "/student-test",
  authMiddleware,
  authorizeRoles("student"),
  (req, res) => {
    res.json({
      success: true,
      message: "Student access granted",
    });
  }
);

router.get(
  "/admin-test",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access granted",
    });
  }
);

module.exports = router;