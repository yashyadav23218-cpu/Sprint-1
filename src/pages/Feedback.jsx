import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Feedback() {
  const navigate = useNavigate();
  const [role, setRole] = useState("MERN Stack Developer");
  const [difficulty, setDifficulty] = useState("Medium");
  const [userAnswers, setUserAnswers] = useState([]);
  const [finalScore, setFinalScore] = useState(8);
  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const savedRole = localStorage.getItem("interviewRole");
    const savedDiff = localStorage.getItem("interviewDifficulty");
    const savedAnswers = localStorage.getItem("userAnswers");
    const savedScore = localStorage.getItem("finalScore");

    if (savedRole) setRole(savedRole);
    if (savedDiff) setDifficulty(savedDiff);
    if (savedScore) setFinalScore(parseInt(savedScore, 10));

    if (savedAnswers) {
      try {
        setUserAnswers(JSON.parse(savedAnswers));
      } catch (err) {
        console.error("Error parsing user answers", err);
      }
    }
  }, []);

  const getScoreDetails = (score) => {
    if (score >= 8) {
      return {
        badge: "Excellent! 🌟",
        message: "Outstanding technical depth and conceptual understanding! You are interview-ready!",
        colorClass: "score-excellent"
      };
    } else if (score >= 6) {
      return {
        badge: "Good Job! 👍",
        message: "Strong foundational knowledge. A bit more practice on edge cases will make you top tier!",
        colorClass: "score-good"
      };
    } else if (score >= 4) {
      return {
        badge: "Fair Effort! 📚",
        message: "You have basic grasp of the concepts. Review the ideal answers to level up your technical terminology.",
        colorClass: "score-average"
      };
    } else {
      return {
        badge: "Needs Practice! 💪",
        message: "Keep going! Review the recommended topics and take practice sessions regularly to build confidence.",
        colorClass: "score-poor"
      };
    }
  };

  const scoreDetails = getScoreDetails(finalScore);

  const copySummary = () => {
    let summaryText = `AI Mock Interview Report\nRole: ${role} (${difficulty} Difficulty)\nScore: ${finalScore}/10 - ${scoreDetails.badge}\n\n`;
    userAnswers.forEach((item, idx) => {
      summaryText += `Q${idx + 1}: ${item.question}\nAnswer: ${item.userAnswer}\nAI Score: ${item.evaluation?.score || 0}/10\n\n`;
    });
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const filteredAnswers = userAnswers.filter((item) => {
    const score = item.evaluation?.score || 0;
    if (activeFilter === "good") return score >= 6;
    if (activeFilter === "needs-work") return score < 6;
    return true;
  });

  return (
    <>
      <Navbar />

      <div className="feedback-container">
        <div className="feedback-header">
          <h2>Interview Feedback & Evaluation 📊</h2>
          <p className="subtitle">
            {role} • {difficulty} Difficulty • Detailed AI Analysis
          </p>
        </div>

        {/* Overall Score Card */}
        <div className={`score-card ${scoreDetails.colorClass}`}>
          <div className="score-number">{finalScore}/10</div>
          <div className="score-badge-pill">{scoreDetails.badge}</div>
          <div className="score-label">{scoreDetails.message}</div>

          <div className="feedback-stats-row">
            <div className="feedback-stat-item">
              <span className="feedback-stat-val">{userAnswers.length}</span>
              <span className="feedback-stat-lbl">Questions</span>
            </div>
            <div className="feedback-stat-item">
              <span className="feedback-stat-val">
                {userAnswers.filter((a) => (a.evaluation?.score || 0) >= 6).length}
              </span>
              <span className="feedback-stat-lbl">Mastered</span>
            </div>
            <div className="feedback-stat-item">
              <span className="feedback-stat-val">
                {userAnswers.filter((a) => (a.evaluation?.score || 0) < 6).length}
              </span>
              <span className="feedback-stat-lbl">Needs Work</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="feedback-action-bar">
          <div className="filter-pill-group">
            <button
              className={`filter-pill ${activeFilter === "all" ? "active" : ""}`}
              onClick={() => setActiveFilter("all")}
            >
              All ({userAnswers.length})
            </button>
            <button
              className={`filter-pill ${activeFilter === "good" ? "active" : ""}`}
              onClick={() => setActiveFilter("good")}
            >
              ✅ Mastered
            </button>
            <button
              className={`filter-pill ${activeFilter === "needs-work" ? "active" : ""}`}
              onClick={() => setActiveFilter("needs-work")}
            >
              ⚠️ Needs Work
            </button>
          </div>

          <button className="btn-outline btn-sm" onClick={copySummary}>
            {copied ? "✓ Copied to Clipboard" : "📋 Copy Summary"}
          </button>
        </div>

        {/* Question-by-Question Breakdown */}
        {filteredAnswers.length === 0 ? (
          <div className="feedback-card" style={{ textAlign: "center", padding: "32px", color: "#64748b" }}>
            No questions match the selected filter.
          </div>
        ) : (
          filteredAnswers.map((item, index) => {
            const itemScore = item.evaluation?.score || 0;
            const isGood = itemScore >= 6;

            return (
              <div className="feedback-card" key={index}>
                <div className="feedback-card-header">
                  <div className="question-header-info">
                    <span className="q-badge">Q{index + 1}</span>
                    <h3 style={{ margin: 0, border: "none", padding: 0 }}>{item.question}</h3>
                  </div>
                  <span className={`score-mini-tag ${isGood ? "tag-good" : "tag-warn"}`}>
                    {itemScore}/10 Score
                  </span>
                </div>

                {/* Candidate Answer */}
                <div className="answer-review-box">
                  <div className="review-box-title">Your Answer:</div>
                  <p className="candidate-answer-text">
                    {item.userAnswer || <em style={{ color: "#94a3b8" }}>No answer provided</em>}
                  </p>
                </div>

                {/* What Was Good */}
                {item.evaluation?.strengths && item.evaluation.strengths.length > 0 && (
                  <div className="feedback-block">
                    <div className="feedback-block-title text-success">
                      <span>✅</span> Key Strengths & Concepts Mentioned:
                    </div>
                    {item.evaluation.strengths.map((str, sIdx) => (
                      <div className="feedback-item" key={sIdx}>
                        <div className="dot-good"></div>
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* What Was Missing */}
                {item.evaluation?.improvements && item.evaluation.improvements.length > 0 && (
                  <div className="feedback-block">
                    <div className="feedback-block-title text-warning">
                      <span>💡</span> Areas for Improvement & Missing Points:
                    </div>
                    {item.evaluation.improvements.map((imp, iIdx) => (
                      <div className="feedback-item" key={iIdx}>
                        <div className="dot-bad"></div>
                        <span>{imp}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Benchmark Ideal Answer */}
                {item.idealAnswer && (
                  <div className="feedback-block ideal-answer-block">
                    <div className="feedback-block-title" style={{ color: "#2563eb" }}>
                      <span>🎯</span> AI Benchmark / Model Answer:
                    </div>
                    <div className="ideal-answer">{item.idealAnswer}</div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Bottom Navigation Buttons */}
        <div className="feedback-buttons">
          <Link to="/select-role">
            <button className="btn-primary">Try Another Interview 🚀</button>
          </Link>
          <Link to="/progress">
            <button className="btn-outline">View Progress Tracker 📈</button>
          </Link>
          <Link to="/">
            <button className="btn-outline">Go Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Feedback;
