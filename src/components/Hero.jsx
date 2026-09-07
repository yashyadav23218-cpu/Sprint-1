import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <h1>
        Practice Interviews with <span>AI</span>
      </h1>

      <p>
        Get AI-generated questions, answer by voice or text,
        and receive instant feedback. Land your dream IT job!
      </p>

      <div className="hero-buttons">
        <Link to="/register" className="btn-primary">
          Start Interview
        </Link>

        <Link to="/login" className="btn-outline">
          Login
        </Link>
      </div>
    </section>
  );
}

export default Hero;