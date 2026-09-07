import { Link } from "react-router-dom";
import { ROLES_DATA } from "../data/questionsData";

function Roles() {
  const roles = Object.values(ROLES_DATA);

  return (
    <section className="roles-section">
      <h2>Available Interview Roles</h2>
      <p className="subtitle" style={{ marginBottom: "24px" }}>
        Select a domain to practice role-specific technical questions
      </p>

      <div className="roles-grid">
        {roles.map((role) => (
          <Link
            to={`/select-role?role=${role.id}`}
            className="role-badge-link"
            key={role.id}
          >
            <span className="role-badge">
              <span style={{ marginRight: "6px" }}>{role.icon}</span>
              {role.name}
            </span>
          </Link>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/select-role" className="btn-primary">
          Start Practice Now 🚀
        </Link>
      </div>
    </section>
  );
}

export default Roles;