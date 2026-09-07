import { Link } from "react-router-dom";
function Login() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          AI <span>Mock</span> Interview
        </Link>
      </nav>

      <div className="auth-container">
        <div className="auth-card">
          <h2>Welcome Back! 👋</h2>

          <p className="subtitle">
            Login to continue your interview practice
          </p>

          <form>
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
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: "100%" }}
            >
              Login
            </button>
          </form>

          <div className="auth-link">
            Don't have an account?{" "}
            <Link to="/register">Register here</Link>
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

export default Login;