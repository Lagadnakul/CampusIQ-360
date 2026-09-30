const Assignment = require("../models/Assignment");

const createAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.create(req.body);

    res.status(201).json({
      success: true,
      message: "Assignment created successfully",
      assignment,
    });
  } catch (error) {
    next(error);
  }
};

const getAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find()
      .populate("subject", "name code");

    res.status(200).json({
      success: true,
      count: assignments.length,
      assignments,
    });
  } catch (error) {
    next(error);
  }
};

const getAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate("subject", "name code");

    if (!assignment) {
      res.statusCode = 404;
      throw new Error("Assignment not found");
    }

    res.status(200).json({
      success: true,
      assignment,
    });
  } catch (error) {
    next(error);
  }
};

const updateAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!assignment) {
      res.statusCode = 404;
      throw new Error("Assignment not found");
    }

    res.status(200).json({
      success: true,
      message: "Assignment updated successfully",
      assignment,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAssignment = async (req, res, next) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);

    if (!assignment) {
      res.statusCode = 404;
      throw new Error("Assignment not found");
    }

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAssignment,
  getAssignments,
  getAssignment,
  updateAssignment,
  deleteAssignment,
};
