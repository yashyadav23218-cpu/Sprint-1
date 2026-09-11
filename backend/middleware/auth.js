const jwt = require("jsonwebtoken");

// Middleware to verify JWT token and protect routes
const auth = (req, res, next) => {
  try {
    // 1. Get token from Authorization header (Bearer <token>)
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided. Authorization denied."
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Invalid token format. Authorization denied."
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "super_secret_interview_jwt_key_2026"
    );

    // 3. Attach user payload (id, email) to request object
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is invalid or expired. Please login again."
    });
  }
};

module.exports = auth;
