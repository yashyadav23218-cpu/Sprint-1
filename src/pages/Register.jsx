import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          AI <span>Mock</span> Interview
        </div>
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
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Example@gmail.com"
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm your password"
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