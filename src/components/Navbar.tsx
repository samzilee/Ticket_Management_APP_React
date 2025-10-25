import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="navbar-root" aria-label="Main navigation">
      <div className="navbar-content">
        <button className="navbar-logo" onClick={() => navigate("/")}>
          TicketFlow
        </button>
        <div className="navbar-links">
          <button
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>
          <button
            className={location.pathname === "/tickets" ? "active" : ""}
            onClick={() => navigate("/tickets")}
          >
            Tickets
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
