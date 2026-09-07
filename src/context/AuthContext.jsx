import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("mock_interview_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("mock_interview_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("mock_interview_user");
    }
  }, [user]);

  const login = (email, password) => {
    // Check registered accounts or allow default login
    const accounts = JSON.parse(localStorage.getItem("mock_interview_accounts") || "[]");
    const found = accounts.find((acc) => acc.email.toLowerCase() === email.toLowerCase());

    const displayName = found ? found.name : email.split("@")[0];
    const loggedUser = { email, name: displayName, loggedInAt: new Date().toISOString() };
    setUser(loggedUser);
    return { success: true, user: loggedUser };
  };

  const register = (name, email, password) => {
    const accounts = JSON.parse(localStorage.getItem("mock_interview_accounts") || "[]");
    const exists = accounts.some((acc) => acc.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, message: "An account with this email already exists!" };
    }

    const newAccount = { name, email, password, createdAt: new Date().toISOString() };
    accounts.push(newAccount);
    localStorage.setItem("mock_interview_accounts", JSON.stringify(accounts));

    const loggedUser = { email, name, loggedInAt: new Date().toISOString() };
    setUser(loggedUser);
    return { success: true, user: loggedUser };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
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
