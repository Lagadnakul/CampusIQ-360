const express = require("express");

const {
  createAssignment,
  getAssignments,
  getAssignment,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// GET ALL ASSIGNMENTS
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getAssignments
);

// GET ONE ASSIGNMENT
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getAssignment
);

// CREATE ASSIGNMENT
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  createAssignment
);

// UPDATE ASSIGNMENT
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  updateAssignment
);

// DELETE ASSIGNMENT
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteAssignment
);

module.exports = router;