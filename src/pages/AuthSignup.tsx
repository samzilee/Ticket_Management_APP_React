import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const AuthSignup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate signup success
      localStorage.setItem("ticketapp_session", JSON.stringify({ email }));
      navigate("/dashboard");
    }, 800);
  };

  return (
    <div className="auth-root">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirm">Confirm Password</label>
        <input
          id="confirm"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}
        <button className="auth-btn" type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="auth-alt">
          <span>Already have an account?</span>
          <button
            type="button"
            className="auth-link"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </button>
        </div>
      </form>
      {/* Toast notification placeholder */}
    </div>
  );
};

export default AuthSignup;
