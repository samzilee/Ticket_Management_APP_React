import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="landing-root">
      <header className="landing-hero">
        <svg
          className="landing-wave"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="#6366f1"
            fillOpacity="0.2"
            d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,181.3C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
        <div className="landing-circle" aria-hidden="true"></div>
        <div className="landing-hero-content">
          <h1 className="landing-title">TicketFlow</h1>
          <p className="landing-desc">
            Effortless ticket management for teams. Track, resolve, and
            collaborate with ease.
          </p>
          <div className="landing-actions">
            <button
              className="landing-btn"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </button>
            <button
              className="landing-btn primary"
              onClick={() => navigate("/auth/signup")}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>
      <section className="landing-features">
        <div className="feature-card">
          <h2>Easy Tracking</h2>
          <p>
            Monitor ticket status and progress in real time with a clean,
            intuitive dashboard.
          </p>
        </div>
        <div className="feature-card">
          <h2>Team Collaboration</h2>
          <p>
            Assign, comment, and resolve tickets together. Stay in sync with
            your team.
          </p>
        </div>
        <div className="feature-card">
          <h2>Instant Updates</h2>
          <p>
            Get notified of changes and updates instantly. Never miss important
            activity.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
