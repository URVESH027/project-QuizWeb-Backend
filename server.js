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

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.warn("WARNING: MONGODB_URI environment variable is not defined.");
  console.warn("Falling back to local MongoDB at mongodb://127.0.0.1:27017/quizDB");
}
const connectionString = MONGODB_URI || "mongodb://127.0.0.1:27017/quizDB";
mongoose.connect(connectionString)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB Connection Error:", err);
    if (process.env.NODE_ENV === "production" || MONGODB_URI) {
      process.exit(1);
    }
  });

// Routes
app.use("/api/questions", questionRoutes);
app.use("/api/leaderboard", require("./routes/leaderboardRoutes"));

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
