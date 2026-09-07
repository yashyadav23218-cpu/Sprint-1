import { Link } from "react-router-dom";

function Roles() {
  const roles = [
    "MERN Stack Developer",
    "Java Developer",
    "Python Developer",
    "Data Analyst",
    "Frontend Developer",
  ];

  return (
    <section className="roles-section">
      <h2>Available Interview Roles</h2>

      <div className="roles-grid">
        {roles.map((role) => (
          <span className="role-badge" key={role}>
            {role}
          </span>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/register" className="btn-primary">
          Get Started Free
        </Link>
      </div>
    </section>
  );
}

export default Roles;