const mongoose = require("mongoose");

const leaderboardSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  bestScore: { type: Number, required: true },
  totalScore: { type: Number, required: true },
  quizzesPlayed: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Leaderboard", leaderboardSchema);
