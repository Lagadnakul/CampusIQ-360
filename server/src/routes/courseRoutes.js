const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const router = express.Router();

// GET ALL COURSES
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getCourses
);

// GET ONE COURSE
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getCourse
);

// CREATE COURSE
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createCourse
);

// UPDATE COURSE
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateCourse
);

// DELETE COURSE
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteCourse
);

module.exports = router;