import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name!");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address!");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    const res = await register(name, email, password);
    setLoading(false);

    if (res.success) {
      navigate("/select-role");
    } else {
      setError(res.message || "Failed to register account.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="auth-container">
        <div className="auth-card">
          <h2>Create Account 🚀</h2>
          <p className="subtitle">Join developers practicing technical interviews with AI</p>

          {error && <div className="alert-badge alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password (min 6 chars)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", padding: "12px" }} disabled={loading}>
              {loading ? "Creating Account..." : "Create Account & Start 🚀"}
            </button>
          </form>

          <div className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
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

export default Register;