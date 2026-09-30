const express = require("express");

const {
  createAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getAttendance
);
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getAttendanceById
);

router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  createAttendance
);

router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  updateAttendance
);

router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteAttendance
);

module.exports = router;