require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const questionRoutes = require("./routes/questionRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/leaderboard", require("./routes/leaderboardRoutes"));

// Error Handling Middleware
app.use(errorHandler);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
const IS_PRODUCTION = process.env.NODE_ENV === "production" || process.env.RENDER;

if (IS_PRODUCTION && !MONGODB_URI) {
  console.error("FATAL ERROR: MONGODB_URI environment variable is not defined on production/Render!");
  process.exit(1);
}

const connectionString = MONGODB_URI || "mongodb://127.0.0.1:27017/quizDB";

console.log("Connecting to MongoDB...");
mongoose.connect(connectionString)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("FATAL ERROR: MongoDB Connection Failed!", err);
    process.exit(1);
  });

module.exports = app;
