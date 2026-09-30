const Attendance = require("../models/Attendance");
const Assignment = require("../models/Assignment");
const Event = require("../models/Event");
const Course = require("../models/Course");
const Student = require("../models/Student");

const getDashboard = async (req, res) => {
  try {
    // =========================
    // ATTENDANCE
    // =========================

    const totalAttendance = await Attendance.countDocuments();

    const presentAttendance = await Attendance.countDocuments({
      status: "present",
    });

    const attendancePercentage =
      totalAttendance === 0
        ? 0
        : Math.round((presentAttendance / totalAttendance) * 100);

    // =========================
    // PENDING ASSIGNMENTS
    // =========================

    const pendingAssignments = await Assignment.countDocuments({
      status: "pending",
    });

    // =========================
    // UPCOMING EVENTS
    // =========================

    const upcomingEvents = await Event.countDocuments({
      date: { $gte: new Date() },
    });

    // =========================
    // COURSES
    // =========================

    const courses = await Course.countDocuments();

    // =========================
    // STUDENTS
    // =========================

    const students = await Student.countDocuments();

    // =========================
    // RESPONSE
    // =========================

    return res.status(200).json({
      success: true,
      data: {
        attendancePercentage,
        pendingAssignments,
        upcomingEvents,
        courses,
        students,
      },
    });
  } catch (error) {
    console.error("Dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get dashboard data",
    });
  }
};

module.exports = {
  getDashboard,
};