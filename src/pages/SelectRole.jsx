import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ROLES_DATA, DIFFICULTY_CONFIG } from "../data/questionsData";

function SelectRole() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const queryRole = searchParams.get("role");
  const [selectedRole, setSelectedRole] = useState(queryRole && ROLES_DATA[queryRole] ? queryRole : "mern");
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(5);
  const [error, setError] = useState("");

  useEffect(() => {
    if (queryRole && ROLES_DATA[queryRole]) {
      setSelectedRole(queryRole);
    }
  }, [queryRole]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) {
      setError("Please select a role to practice!");
      return;
    }
    if (!selectedDifficulty) {
      setError("Please select a difficulty level!");
      return;
    }

    // Save configuration in localStorage
    localStorage.setItem("selectedRole", selectedRole);
    localStorage.setItem("selectedDifficulty", selectedDifficulty);
    localStorage.setItem("selectedQuestionCount", questionCount.toString());

    // Navigate to interview
    navigate("/interview");
  };

  const roleList = Object.values(ROLES_DATA);

  return (
    <>
      <Navbar />

      <div className="select-container">
        <div className="select-card">
          <div className="select-header">
            <h2>Select Role & Difficulty 🎯</h2>
            <p className="subtitle">
              Choose your target role, difficulty, and question count to launch your AI interview.
            </p>
          </div>

          {error && <div className="alert-badge alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {/* Interactive Role Cards */}
            <div className="form-group">
              <label>Choose Interview Role</label>
              <div className="role-selection-grid">
                {roleList.map((role) => (
                  <button
                    type="button"
                    key={role.id}
                    className={`role-select-item ${selectedRole === role.id ? "active" : ""}`}
                    onClick={() => {
                      setSelectedRole(role.id);
                      setError("");
                    }}
                  >
                    <span className="role-item-icon">{role.icon}</span>
                    <div className="role-item-text">
                      <div className="role-item-name">{role.name}</div>
                      <div className="role-item-desc">{role.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selector */}
            <div className="form-group">
              <label>Select Difficulty Level</label>
              <div className="difficulty-grid">
                {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => (
                  <button
                    type="button"
                    key={key}
                    className={`difficulty-card ${selectedDifficulty === key ? "active " + config.badgeClass : ""}`}
                    onClick={() => setSelectedDifficulty(key)}
                  >
                    <div className="difficulty-title">{config.name}</div>
                    <div className="difficulty-time">⏱ {config.timePerQuestion}s / question</div>
                    <div className="difficulty-desc">{config.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count Selector */}
            <div className="form-group">
              <label>Number of Questions</label>
              <div className="count-selector">
                {[3, 5, 8].map((count) => (
                  <button
                    type="button"
                    key={count}
                    className={`count-btn ${questionCount === count ? "active" : ""}`}
                    onClick={() => setQuestionCount(count)}
                  >
                    {count} Questions
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: "16px" }}>
              Start AI Interview 🚀
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link to="/" className="back-link">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectRole;
