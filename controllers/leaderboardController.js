const Leaderboard = require("../models/Leaderboard");

// @desc    Get top leaderboard entries
// @route   GET /api/leaderboard
// @access  Public
const getLeaderboard = async (req, res, next) => {
  try {
    const leaderboard = await Leaderboard.find({})
      .sort({ bestScore: -1, totalScore: -1 })
      .limit(50);
    res.status(200).json({ success: true, count: leaderboard.length, data: leaderboard });
  } catch (error) {
    next(error);
  }
};

// @desc    Update or create a user's leaderboard entry
// @route   POST /api/leaderboard
// @access  Public
const updateLeaderboard = async (req, res, next) => {
  try {
    const { username, bestScore, totalScore, quizzesPlayed } = req.body;

    if (!username) {
      return res.status(400).json({ success: false, message: "Username is required" });
    }

    let entry = await Leaderboard.findOne({ username });

    if (entry) {
      // Update existing entry
      entry.bestScore = Math.max(entry.bestScore, bestScore);
      entry.totalScore = totalScore;
      entry.quizzesPlayed = quizzesPlayed;
      await entry.save();
    } else {
      // Create new entry
      entry = await Leaderboard.create({
        username,
        bestScore,
        totalScore,
        quizzesPlayed
      });
    }

    res.status(200).json({ success: true, data: entry });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeaderboard,
  updateLeaderboard
};
