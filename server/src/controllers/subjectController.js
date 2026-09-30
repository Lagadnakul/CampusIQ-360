const Subject = require("../models/Subject");

// Create Subject
const createSubject = async (req, res, next) => {
  try {
    const subject = await Subject.create(req.body);

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      subject,
    });
  } catch (error) {
    next(error);
  }
};

// Get all Subjects
const getSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.find()
      .populate("course", "name code department");

    res.status(200).json({
      success: true,
      count: subjects.length,
      subjects,
    });
  } catch (error) {
    next(error);
  }
};

// Get single Subject
const getSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id)
      .populate("course", "name code department");

    if (!subject) {
      res.statusCode = 404;
      throw new Error("Subject not found");
    }

    res.status(200).json({
      success: true,
      subject,
    });
  } catch (error) {
    next(error);
  }
};

// Update Subject
const updateSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!subject) {
      res.statusCode = 404;
      throw new Error("Subject not found");
    }

    res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      subject,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Subject
const deleteSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);

    if (!subject) {
      res.statusCode = 404;
      throw new Error("Subject not found");
    }

    res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
};