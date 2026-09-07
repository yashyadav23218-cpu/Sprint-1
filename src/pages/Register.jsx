import { Link } from "react-router-dom";
import { useState } from "react";

function Register() {
       const [name, setName] = useState("");
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");
       const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          AI <span>Mock</span> Interview
        </Link>
      </nav>

      <div className="auth-container">
        <div className="auth-card">
          <h2>Create Account 🚀</h2>

          <p className="subtitle">
            Join thousands of students practicing with AI
          </p>

          <form>
            <div className="form-group">
              <label>Full Name</label>

             <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <input
               type="email"
               placeholder="Example@gmail.com"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
              <label>Password</label>

             <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
               />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

               <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%" }}
            >
              Create Account
            </button>
          </form>

          <div className="auth-link">
            Already have an account?{" "}
            <Link to="/login">Login here</Link>
          </div>

          <div style={{ textAlign: "center", marginTop: "10px" }}>
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