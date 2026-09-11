const mongoose = require("mongoose");

// User Schema for authentication
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your full name"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
