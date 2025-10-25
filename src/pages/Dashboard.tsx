import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import Toast from "../components/Toast";

interface Ticket {
  id: string;
  title: string;
  status: "open" | "in_progress" | "closed";
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("ticketapp_session");
    if (!session) {
      setToast({
        message: "Your session has expired — please log in again.",
        type: "error",
      });
      setTimeout(() => navigate("/auth/login"), 1200);
      return;
    }
    try {
      const stored = localStorage.getItem("ticketapp_tickets");
      setTickets(stored ? JSON.parse(stored) : []);
    } catch {
      setToast({
        message: "Failed to load tickets. Please retry.",
        type: "error",
      });
    }
  }, [navigate]);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const resolved = tickets.filter((t) => t.status === "closed").length;

  const handleLogout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/");
  };

  const handleCloseToast = () => setToast(null);

  return (
    <div className="dashboard-root">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <button className="dashboard-logout" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <section className="dashboard-cards">
        <div className="dashboard-card">
          <span className="dashboard-label">Total Tickets</span>
          <span className="dashboard-value">{total}</span>
        </div>
        <div className="dashboard-card status-open">
          <span className="dashboard-label">Open Tickets</span>
          <span className="dashboard-value">{open}</span>
        </div>
        <div className="dashboard-card status-closed">
          <span className="dashboard-label">Resolved Tickets</span>
          <span className="dashboard-value">{resolved}</span>
        </div>
      </section>
      <nav className="dashboard-nav">
        <button
          className="dashboard-nav-btn"
          onClick={() => navigate("/tickets")}
        >
          Go to Ticket Management
        </button>
      </nav>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default Dashboard;
