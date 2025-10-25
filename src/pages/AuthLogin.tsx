import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const AuthLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === "demo@ticketflow.com" && password === "demo123") {
        localStorage.setItem("ticketapp_session", JSON.stringify({ email }));
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Try demo@ticketflow.com / demo123");
      }
    }, 800);
  };

  return (
    <div className="auth-root">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}
        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="auth-alt">
          <span>Don&apos;t have an account?</span>
          <button
            type="button"
            className="auth-link"
            onClick={() => navigate("/auth/signup")}
          >
            Sign Up
          </button>
        </div>
      </form>
      {/* Toast notification placeholder */}
    </div>
  );
};

export default AuthLogin;
