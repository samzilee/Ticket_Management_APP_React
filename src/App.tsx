import "./App.css";
import "./styles/global.css";
import AppRoutes from "./routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="main-container">
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
