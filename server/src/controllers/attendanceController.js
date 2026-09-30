const Attendance = require("../models/Attendance");

// Create attendance record
const createAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.create(req.body);

    res.status(201).json({
      success: true,
      message: "Attendance created successfully",
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Get all attendance records
const getAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.find()
      .populate("student")
      .populate("subject", "name code");

    res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Get one attendance record
const getAttendanceById = async (req, res, next) => {
  try {
    const attendance = await Attendance.findById(req.params.id)
      .populate("student")
      .populate("subject", "name code");

    if (!attendance) {
      res.statusCode = 404;
      throw new Error("Attendance record not found");
    }

    res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Update attendance record
const updateAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!attendance) {
      res.statusCode = 404;
      throw new Error("Attendance record not found");
    }

    res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      attendance,
    });
  } catch (error) {
    next(error);
  }
};

// Delete attendance record
const deleteAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.findByIdAndDelete(req.params.id);

    if (!attendance) {
      res.statusCode = 404;
      throw new Error("Attendance record not found");
    }

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAttendance,
  getAttendance,
  getAttendanceById,
  updateAttendance,
  deleteAttendance,
};