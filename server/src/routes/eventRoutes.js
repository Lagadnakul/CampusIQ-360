const express = require("express");

const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// GET ALL EVENTS
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getEvents
);

// GET ONE EVENT
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getEvent
);

// CREATE EVENT
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createEvent
);

// UPDATE EVENT
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateEvent
);

// DELETE EVENT
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteEvent
);

module.exports = router;