import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Hero() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="hero">
      <div className="hero-badge">⚡ Powered by AI & Speech Recognition</div>
      <h1>
        Practice Technical Interviews with <span>AI</span>
      </h1>

      <p>
        Get role-specific questions, speak or type your answers naturally,
        and receive instant AI evaluation with benchmark model answers. Land your dream tech job!
      </p>

      <div className="hero-buttons">
        <Link to="/select-role" className="btn-primary" style={{ padding: "12px 28px", fontSize: "15px" }}>
          Start Practice Interview 🚀
        </Link>

        {!isAuthenticated && (
          <Link to="/login" className="btn-outline" style={{ padding: "12px 24px", fontSize: "15px" }}>
            Login / Sign In
          </Link>
        )}

        {isAuthenticated && (
          <Link to="/progress" className="btn-outline" style={{ padding: "12px 24px", fontSize: "15px" }}>
            View My Progress 📈
          </Link>
        )}
      </div>

      <div className="hero-stats-banner">
        <div className="hero-stat">
          <strong>5+</strong>
          <span>Tech Domains</span>
        </div>
        <div className="hero-stat-divider"></div>
        <div className="hero-stat">
          <strong>3</strong>
          <span>Difficulty Levels</span>
        </div>
        <div className="hero-stat-divider"></div>
        <div className="hero-stat">
          <strong>100%</strong>
          <span>Instant AI Feedback</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;