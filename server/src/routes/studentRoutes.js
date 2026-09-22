const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();


// =====================================
// GET ALL STUDENTS
// Admin + Faculty
// =====================================
router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getStudents
);


// =====================================
// GET SINGLE STUDENT
// Admin + Faculty
// =====================================
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("admin", "faculty"),
  getStudent
);


// =====================================
// CREATE STUDENT
// Admin only
// =====================================
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  createStudent
);


// =====================================
// UPDATE STUDENT
// Admin only
// =====================================
router.put(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  updateStudent
);


// =====================================
// DELETE STUDENT
// Admin only
// =====================================
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("admin"),
  deleteStudent
);


module.exports = router;