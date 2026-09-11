const mongoose = require("mongoose");

// Interview Result Schema to track user attempts and progress
const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  role: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    default: 5
  },
  result: {
    type: String,
    enum: ["Excellent", "Good", "Average", "Needs Practice", "Poor"],
    default: "Good"
  },
  answers: [
    {
      questionId: String,
      question: String,
      idealAnswer: String,
      tips: String,
      userAnswer: String,
      evaluation: {
        score: Number,
        strengths: [String],
        improvements: [String],
        wordCount: Number,
        matchedKeywords: [String]
      }
    }
  ],
  date: {
    type: String,
    default: () => {
      const today = new Date();
      return `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Interview", interviewSchema);
