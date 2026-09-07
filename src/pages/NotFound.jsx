import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function NotFound() {
  return (
    <>
      <Navbar />
      <div className="auth-container" style={{ textAlign: "center" }}>
        <div className="auth-card" style={{ maxWidth: "500px" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
          <h2>Page Not Found</h2>
          <p className="subtitle" style={{ marginBottom: "24px" }}>
            The page you are looking for doesn't exist or has moved.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link to="/" className="btn-primary">
              Return Home
            </Link>
            <Link to="/select-role" className="btn-outline">
              Practice Interview
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
