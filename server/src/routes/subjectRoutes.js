const express = require("express");

const {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Get all subjects
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getSubjects
);

// Get one subject
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getSubject
);

// Create subject
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createSubject
);

// Update subject
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateSubject
);

// Delete subject
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteSubject
);

module.exports = router;