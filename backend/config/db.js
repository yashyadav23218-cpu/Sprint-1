const mongoose = require("mongoose");

// Simple MongoDB connection function
const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai-mock-interview";
  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.log("💡 Tip: Ensure MongoDB is running locally, or add your MongoDB Atlas URI to backend/.env (e.g. MONGO_URI=mongodb+srv://...)");
  }
};

module.exports = connectDB;

