function Login() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          AI <span>Mock</span> Interview
        </div>
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
            <a href="/register">Register here</a>
          </div>

          <div style={{ textAlign: "center", marginTop: "10px" }}>
            <a href="/" className="back-link">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;