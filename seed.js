const mongoose = require("mongoose");
const Question = require("./models/Question");

const questions = [
  {
    question: "Which language is heavily used for building modern frontend web applications?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript",
    category: "Web Development",
    difficulty: "Easy",
    explanation: "JavaScript is the primary scripting language used to build interactive and dynamic user interfaces on the web."
  },
  {
    question: "React is a ____",
    options: ["Framework", "Library", "Language", "Tool"],
    answer: "Library",
    category: "Web Development",
    difficulty: "Medium",
    explanation: "React is a JavaScript library for building user interfaces, primarily maintained by Meta."
  },
  {
    question: "Which of the following is NOT a hook introduced in React 16.8?",
    options: ["useState", "useEffect", "useContext", "useComponentDidMount"],
    answer: "useComponentDidMount",
    category: "React",
    difficulty: "Hard",
    explanation: "Hooks like useState and useEffect replaced lifecycle methods. useComponentDidMount is not a valid hook."
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    answer: "Cascading Style Sheets",
    category: "Web Development",
    difficulty: "Easy",
    explanation: "CSS describes how HTML elements are to be displayed on screen, paper, or in other media."
  },
  {
    question: "Which HTTP status code signifies that a resource was successfully created?",
    options: ["200 OK", "201 Created", "204 No Content", "404 Not Found"],
    answer: "201 Created",
    category: "Networking",
    difficulty: "Medium",
    explanation: "The HTTP 201 Created success status response code indicates that the request has succeeded and has led to the creation of a resource."
  }
];

mongoose.connect("mongodb://127.0.0.1:27017/quizDB")
  .then(async () => {
    console.log("MongoDB Connected for seeding");
    await Question.deleteMany({}); // clear existing
    await Question.insertMany(questions);
    console.log("Questions seeded successfully!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.log("Error seeding:", err);
    process.exit(1);
  });
