import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        AI <span>Mock</span> Interview
      </Link>

      <div className="navbar-nav-links">
        <Link to="/select-role" className="nav-link">
          🎯 Practice
        </Link>
        <Link to="/progress" className="nav-link">
          📈 Progress
        </Link>
      </div>

      <div className="navbar-buttons">
        {isAuthenticated ? (
          <div className="user-profile-menu">
            <span className="user-badge">
              👤 {user.name || user.email.split("@")[0]}
            </span>
            <button onClick={handleLogout} className="btn-outline btn-sm">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="btn-outline">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;