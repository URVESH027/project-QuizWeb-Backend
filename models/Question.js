const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
  category: { type: String, default: "General" },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
  explanation: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
