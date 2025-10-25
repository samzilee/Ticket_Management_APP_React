import React, { useState, useEffect } from "react";
import type { Ticket } from "../pages/Tickets";
import "../styles/Form.css";

interface FormProps {
  ticket: Ticket | null;
  onSave: (ticket: Ticket | Omit<Ticket, "id">) => void;
  onCancel: () => void;
}

const Form: React.FC<FormProps> = ({ ticket, onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"open" | "in_progress" | "closed">(
    "open"
  );
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setStatus(ticket.status);
      setDescription(ticket.description || "");
    } else {
      setTitle("");
      setStatus("open");
      setDescription("");
    }
    setError("");
  }, [ticket]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!["open", "in_progress", "closed"].includes(status)) {
      setError("Status must be valid.");
      return;
    }
    setError("");
    if (ticket && ticket.id) {
      onSave({ ...ticket, title, status, description });
    } else {
      onSave({ title, status, description });
    }
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <h2>{ticket ? "Edit Ticket" : "New Ticket"}</h2>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="status">Status</label>
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value as any)}
        required
      >
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
      <label htmlFor="desc">Description</label>
      <textarea
        id="desc"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      <div className="form-actions">
        <button className="form-save" type="submit">
          {ticket ? "Update" : "Create"}
        </button>
        <button className="form-cancel" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Form;
