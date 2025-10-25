import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import AuthLogin from "./pages/AuthLogin";
import AuthSignup from "./pages/AuthSignup";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/auth/login" element={<AuthLogin />} />
    <Route path="/auth/signup" element={<AuthSignup />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/tickets" element={<Tickets />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
