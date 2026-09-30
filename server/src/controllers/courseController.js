const Course = require("../models/Course");

// CREATE COURSE
const createCourse = async (req, res) => {
  try {
    const { name, code, department } = req.body;

    if (!name || !code || !department) {
      return res.status(400).json({
        success: false,
        message: "Name, code and department are required",
      });
    }

    const existingCourse = await Course.findOne({
      code: code.toUpperCase(),
    });

    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: "Course with this code already exists",
      });
    }

    const course = await Course.create({
      name,
      code,
      department,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    console.error("Create course error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

// GET ALL COURSES
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error("Get courses error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get courses",
    });
  }
};

// GET ONE COURSE
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Get course error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get course",
    });
  }
};

// UPDATE COURSE
const updateCourse = async (req, res) => {
  try {
    const { name, code, department } = req.body;

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        name,
        code,
        department,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    console.error("Update course error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update course",
    });
  }
};

// DELETE COURSE
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};