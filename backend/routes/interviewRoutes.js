const express = require("express");
const router = express.Router();
const Interview = require("../models/Interview");
const auth = require("../middleware/auth");

// All interview routes are protected by JWT auth middleware
router.use(auth);

// @route   POST /api/interviews
// @desc    Save a new interview result
// @access  Private
router.post("/", async (req, res) => {
  try {
    const { role, difficulty, score, totalQuestions, result, answers, date } = req.body;

    if (!role || !difficulty || score === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required interview fields (role, difficulty, score)"
      });
    }

    const newInterview = new Interview({
      userId: req.user.id,
      role,
      difficulty,
      score: Number(score),
      totalQuestions: totalQuestions || (answers ? answers.length : 5),
      result: result || (score >= 8 ? "Excellent" : score >= 6 ? "Good" : score >= 4 ? "Average" : "Needs Practice"),
      answers: answers || [],
      date: date || undefined
    });

    const savedInterview = await newInterview.save();

    return res.status(201).json({
      success: true,
      message: "Interview result saved successfully!",
      interview: savedInterview
    });
  } catch (error) {
    console.error("Save Interview Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error saving interview result"
    });
  }
});

// @route   GET /api/interviews
// @desc    Get all interview results for logged-in user
// @access  Private
router.get("/", async (req, res) => {
  try {
    const interviews = await Interview.find({ userId: req.user.id })
      .sort({ createdAt: -1 }); // Newest first

    return res.json({
      success: true,
      count: interviews.length,
      interviews
    });
  } catch (error) {
    console.error("Fetch Interviews Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching interview history"
    });
  }
});

// @route   DELETE /api/interviews/:id
// @desc    Delete a single interview entry
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Interview.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id // Ensure user owns the interview record
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Interview entry not found"
      });
    }

    return res.json({
      success: true,
      message: "Interview entry deleted successfully"
    });
  } catch (error) {
    console.error("Delete Interview Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error deleting interview entry"
    });
  }
});

// @route   DELETE /api/interviews
// @desc    Clear entire interview history for logged-in user
// @access  Private
router.delete("/", async (req, res) => {
  try {
    await Interview.deleteMany({ userId: req.user.id });

    return res.json({
      success: true,
      message: "All interview history cleared successfully"
    });
  } catch (error) {
    console.error("Clear Interviews Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error clearing interview history"
    });
  }
});

module.exports = router;
