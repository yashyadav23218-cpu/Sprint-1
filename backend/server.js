const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests from React frontend
app.use(express.json()); // Parse incoming JSON request bodies

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/interviews", require("./routes/interviewRoutes"));

// Root Health Check Route
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "AI Mock Interview API is running smoothly 🚀",
    endpoints: {
      auth: {
        register: "POST /api/auth/register",
        login: "POST /api/auth/login",
        me: "GET /api/auth/me"
      },
      interviews: {
        save: "POST /api/interviews",
        list: "GET /api/interviews",
        deleteSingle: "DELETE /api/interviews/:id",
        clearAll: "DELETE /api/interviews"
      }
    }
  });
});

// Port configuration & Server Start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 API health check available at http://localhost:${PORT}/`);
});
