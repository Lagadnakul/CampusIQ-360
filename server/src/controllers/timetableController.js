const Timetable = require("../models/Timetable");

// CREATE TIMETABLE
const createTimetable = async (req, res, next) => {
  try {
    const timetable = await Timetable.create(req.body);

    res.status(201).json({
      success: true,
      message: "Timetable created successfully",
      timetable,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL TIMETABLE
const getTimetables = async (req, res, next) => {
  try {
    const timetables = await Timetable.find()
      .populate("course", "name code")
      .populate("subject", "name code");

    res.status(200).json({
      success: true,
      count: timetables.length,
      timetables,
    });
  } catch (error) {
    next(error);
  }
};

// GET ONE TIMETABLE
const getTimetable = async (req, res, next) => {
  try {
    const timetable = await Timetable.findById(req.params.id)
      .populate("course", "name code")
      .populate("subject", "name code");

    if (!timetable) {
      res.statusCode = 404;
      throw new Error("Timetable not found");
    }

    res.status(200).json({
      success: true,
      timetable,
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE TIMETABLE
const updateTimetable = async (req, res, next) => {
  try {
    const timetable = await Timetable.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!timetable) {
      res.statusCode = 404;
      throw new Error("Timetable not found");
    }

    res.status(200).json({
      success: true,
      message: "Timetable updated successfully",
      timetable,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE TIMETABLE
const deleteTimetable = async (req, res, next) => {
  try {
    const timetable = await Timetable.findByIdAndDelete(
      req.params.id
    );

    if (!timetable) {
      res.statusCode = 404;
      throw new Error("Timetable not found");
    }

    res.status(200).json({
      success: true,
      message: "Timetable deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTimetable,
  getTimetables,
  getTimetable,
  updateTimetable,
  deleteTimetable,
};