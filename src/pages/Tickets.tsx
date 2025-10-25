import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketCard from "../components/TicketCard";
import Form from "../components/Form";
import Toast from "../components/Toast";
import "../styles/Tickets.css";

export interface Ticket {
  id: string;
  title: string;
  status: "open" | "in_progress" | "closed";
  description?: string;
}

type ToastType = { message: string; type: "success" | "error" } | null;

const Tickets: React.FC = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [editing, setEditing] = useState<Ticket | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState<ToastType>(null);

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

  const saveTickets = (newTickets: Ticket[]) => {
    setTickets(newTickets);
    localStorage.setItem("ticketapp_tickets", JSON.stringify(newTickets));
  };

  const handleCreate = (ticket: Omit<Ticket, "id">) => {
    if (!ticket.title.trim()) {
      setToast({ message: "Title is required.", type: "error" });
      return;
    }
    if (!["open", "in_progress", "closed"].includes(ticket.status)) {
      setToast({ message: "Status must be valid.", type: "error" });
      return;
    }
    const newTicket = { ...ticket, id: Date.now().toString() };
    const newTickets = [newTicket, ...tickets];
    saveTickets(newTickets);
    setToast({ message: "Ticket created!", type: "success" });
    setShowForm(false);
  };

  const handleUpdate = (ticket: Ticket) => {
    if (!ticket.title.trim()) {
      setToast({ message: "Title is required.", type: "error" });
      return;
    }
    if (!["open", "in_progress", "closed"].includes(ticket.status)) {
      setToast({ message: "Status must be valid.", type: "error" });
      return;
    }
    const newTickets = tickets.map((t) => (t.id === ticket.id ? ticket : t));
    saveTickets(newTickets);
    setToast({ message: "Ticket updated.", type: "success" });
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this ticket?")) return;
    const newTickets = tickets.filter((t) => t.id !== id);
    saveTickets(newTickets);
    setToast({ message: "Ticket deleted.", type: "success" });
  };

  const handleEdit = (ticket: Ticket) => {
    setEditing(ticket);
    setShowForm(true);
  };

  const handleCloseToast = () => setToast(null);

  return (
    <div className="tickets-root">
      <header className="tickets-header">
        <h1>Ticket Management</h1>
        <button
          className="tickets-create-btn"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          + New Ticket
        </button>
      </header>
      {showForm && (
        <Form
          ticket={editing}
          onSave={editing ? (handleUpdate as any) : handleCreate}
          onCancel={() => {
            setEditing(null);
            setShowForm(false);
          }}
        />
      )}
      <section className="tickets-list">
        {tickets.length === 0 ? (
          <div className="tickets-empty">No tickets yet.</div>
        ) : (
          tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={() => handleEdit(ticket)}
              onDelete={() => handleDelete(ticket.id)}
            />
          ))
        )}
      </section>
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

export default Tickets;
