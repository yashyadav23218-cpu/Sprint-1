import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        AI <span>Mock</span> Interview
      </Link>

      <div className="navbar-buttons">
        <Link to="/login" className="btn-outline">
          Login
        </Link>
        <Link to="/register" className="btn-primary">
          Get Started
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;