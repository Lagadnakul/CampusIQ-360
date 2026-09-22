const Student = require("../models/Student");

// =====================================
// CREATE STUDENT
// =====================================
const createStudent = async (req, res) => {
  try {
    const { name, email, course, semester } = req.body;

    if (!name || !email || !course || !semester) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message: "Student with this email already exists",
      });
    }

    const student = await Student.create({
      name,
      email,
      course,
      semester,
    });

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    console.error("Create student error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create student",
    });
  }
};


// =====================================
// GET ALL STUDENTS
// =====================================
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("Get students error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get students",
    });
  }
};


// =====================================
// GET SINGLE STUDENT
// =====================================
const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error("Get student error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get student",
    });
  }
};


// =====================================
// UPDATE STUDENT
// =====================================
const updateStudent = async (req, res) => {
  try {
    const { name, email, course, semester } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        course,
        semester,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("Update student error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update student",
    });
  }
};


// =====================================
// DELETE STUDENT
// =====================================
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.error("Delete student error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete student",
    });
  }
};


module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};