import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address!");
      return;
    }

    if (!password) {
      setError("Please enter your password!");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    const res = login(email, password);
    if (res.success) {
      navigate("/select-role");
    } else {
      setError(res.message || "Failed to log in.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          <h2>Welcome Back! 👋</h2>
          <p className="subtitle">Login to continue your AI mock interview practice</p>

          {error && <div className="alert-badge alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="developer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", padding: "12px" }}>
              Login & Continue 🚀
            </button>
          </form>

          <div className="auth-link">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>

          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <Link to="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;