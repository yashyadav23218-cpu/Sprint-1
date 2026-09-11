import { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../config/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("mock_interview_token") || null);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("mock_interview_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Keep state in sync with localStorage
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("mock_interview_user", JSON.stringify(user));
      localStorage.setItem("mock_interview_token", token);
    } else if (!user) {
      localStorage.removeItem("mock_interview_user");
      localStorage.removeItem("mock_interview_token");
    }
  }, [user, token]);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Invalid email or password" };
      }

      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      console.error("Login API error:", err);
      return {
        success: false,
        message: "Could not connect to backend server. Make sure backend is running on port 5000."
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Registration failed" };
      }

      setToken(data.token);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      console.error("Register API error:", err);
      return {
        success: false,
        message: "Could not connect to backend server. Make sure backend is running on port 5000."
      };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("mock_interview_user");
    localStorage.removeItem("mock_interview_token");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

