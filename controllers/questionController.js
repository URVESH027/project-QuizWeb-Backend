const Question = require("../models/Question");

// @desc    Get all questions
// @route   GET /api/questions
// @access  Public
const getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find({});
    res.status(200).json({ success: true, count: questions.length, data: questions });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new question
// @route   POST /api/questions
// @access  Public (Should be protected in production)
const createQuestion = async (req, res, next) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({ success: true, data: question });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestions,
  createQuestion
};
