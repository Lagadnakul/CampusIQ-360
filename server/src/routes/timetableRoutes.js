const express = require("express");

const {
  createTimetable,
  getTimetables,
  getTimetable,
  updateTimetable,
  deleteTimetable,
} = require("../controllers/timetableController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// GET ALL
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getTimetables
);

// GET ONE
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getTimetable
);

// CREATE
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createTimetable
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateTimetable
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteTimetable
);

module.exports = router;