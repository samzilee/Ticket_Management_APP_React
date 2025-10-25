import React from "react";
import type { Ticket } from "../pages/Tickets";
import "../styles/TicketCard.css";

interface TicketCardProps {
  ticket: Ticket;
  onEdit: () => void;
  onDelete: () => void;
}

const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={`ticket-card status-${ticket.status}`}>
      <div className="ticket-card-header">
        <h3>{ticket.title}</h3>
        <span className={`ticket-status status-${ticket.status}`}>
          {ticket.status.replace("_", " ")}
        </span>
      </div>
      {ticket.description && (
        <p className="ticket-desc">{ticket.description}</p>
      )}
      <div className="ticket-card-actions">
        <button className="ticket-edit" onClick={onEdit}>
          Edit
        </button>
        <button className="ticket-delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TicketCard;
