const express = require("express");
const { getLeaderboard, updateLeaderboard } = require("../controllers/leaderboardController");

const router = express.Router();

router.route("/")
  .get(getLeaderboard)
  .post(updateLeaderboard);

module.exports = router;
