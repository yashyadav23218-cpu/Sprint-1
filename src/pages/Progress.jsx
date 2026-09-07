import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Progress() {
  const [history, setHistory] = useState([]);
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("interviewHistory");
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Error loading interview history", err);
    }
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire interview history?")) {
      localStorage.removeItem("interviewHistory");
      setHistory([]);
    }
  };

  const removeSingleEntry = (indexToRemove) => {
    const updated = history.filter((_, idx) => idx !== indexToRemove);
    setHistory(updated);
    localStorage.setItem("interviewHistory", JSON.stringify(updated));
  };

  // Calculate stats
  const totalInterviews = history.length;
  let avgScore = "0.0";
  let bestScore = 0;
  let topRole = "-";

  if (totalInterviews > 0) {
    const totalScore = history.reduce((acc, curr) => acc + (parseFloat(curr.score) || curr.numericScore || 0), 0);
    avgScore = (totalScore / totalInterviews).toFixed(1);

    const scores = history.map((h) => parseFloat(h.score) || h.numericScore || 0);
    bestScore = Math.max(...scores);

    const roleCounts = {};
    history.forEach((h) => {
      const r = h.role || "General";
      roleCounts[r] = (roleCounts[r] || 0) + 1;
    });

    let maxCount = 0;
    Object.entries(roleCounts).forEach(([r, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topRole = r;
      }
    });
  }

  // Filtered history
  const filteredHistory = filterRole === "all"
    ? history
    : history.filter((h) => (h.role || "").toLowerCase().includes(filterRole.toLowerCase()));

  const reversedHistory = [...filteredHistory].reverse();

  return (
    <>
      <Navbar />

      <div className="progress-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
          <div>
            <h2>Your Interview Progress 📈</h2>
            <p className="subtitle" style={{ margin: 0 }}>
              Track your scores, mastery, and consistency over time
            </p>
          </div>

          {totalInterviews > 0 && (
            <button className="btn-outline btn-sm" onClick={clearHistory} style={{ color: "#dc2626", borderColor: "#fecaca" }}>
              🗑 Clear History
            </button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper">🎯</div>
            <div className="stat-number">{totalInterviews}</div>
            <div className="stat-label">Total Interviews</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">📊</div>
            <div className="stat-number">{avgScore} <span style={{ fontSize: "14px", color: "#94a3b8" }}>/10</span></div>
            <div className="stat-label">Average Score</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">🏆</div>
            <div className="stat-number">{bestScore} <span style={{ fontSize: "14px", color: "#94a3b8" }}>/10</span></div>
            <div className="stat-label">Best Score</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper">💼</div>
            <div className="stat-number" style={{ fontSize: "20px" }}>{topRole.split(" ")[0]}</div>
            <div className="stat-label">Top Role: {topRole}</div>
          </div>
        </div>

        {/* History Table with Filters */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
          <h3 style={{ fontSize: "18px", color: "#1e293b" }}>Interview History</h3>

          {totalInterviews > 0 && (
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <label style={{ fontSize: "13px", color: "#64748b" }}>Filter Role:</label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                style={{ padding: "6px 12px", borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "13px" }}
              >
                <option value="all">All Roles</option>
                <option value="mern">MERN Stack</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="data">Data Analyst</option>
                <option value="frontend">Frontend</option>
              </select>
            </div>
          )}
        </div>

        <div className="history-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Role</th>
                <th>Difficulty</th>
                <th>Score</th>
                <th>Result</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reversedHistory.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", color: "#64748b", padding: "40px 20px", fontSize: "14px" }}
                  >
                    <div style={{ fontSize: "36px", marginBottom: "12px" }}>🚀</div>
                    <div style={{ fontWeight: 600, color: "#1e293b", marginBottom: "4px" }}>
                      No interviews recorded yet!
                    </div>
                    <div>Start your first AI mock interview and your progress will show up here.</div>
                    <div style={{ marginTop: "16px" }}>
                      <Link to="/select-role" className="btn-primary">
                        Take Interview Now
                      </Link>
                    </div>
                  </td>
                </tr>
              ) : (
                reversedHistory.map((item, index) => {
                  const originalIndex = history.length - 1 - index;
                  let resultClass = "result-bad";
                  if (item.result === "Excellent" || item.result === "Good") resultClass = "result-good";
                  else if (item.result === "Average") resultClass = "result-avg";

                  return (
                    <tr key={item.id || index}>
                      <td>{item.date}</td>
                      <td><strong>{item.role}</strong></td>
                      <td>
                        <span className="table-diff-badge">{item.difficulty}</span>
                      </td>
                      <td><strong>{item.score}</strong></td>
                      <td className={resultClass}>
                        <span className="result-pill">{item.result}</span>
                      </td>
                      <td>
                        <button
                          className="table-del-btn"
                          title="Delete entry"
                          onClick={() => removeSingleEntry(originalIndex)}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Quick CTA Actions */}
        <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
          <Link to="/select-role">
            <button className="btn-primary">Start New Interview 🚀</button>
          </Link>
          <Link to="/">
            <button className="btn-outline">Go Home</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Progress;
