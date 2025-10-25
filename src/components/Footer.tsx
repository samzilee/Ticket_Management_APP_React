import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => (
  <footer className="footer-root" role="contentinfo">
    <span>
      &copy; {new Date().getFullYear()} TicketFlow. All rights reserved.
    </span>
  </footer>
);

export default Footer;
