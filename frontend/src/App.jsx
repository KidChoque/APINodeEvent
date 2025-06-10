import { BrowserRouter, Routes, Route } from "react-router-dom";
import TipoEventosPage from "./pages/TipoEventosPage";
import EventosPage from "./pages/EventosPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tipoeventos" element={<TipoEventosPage />} />
        <Route path="/eventos" element={<EventosPage />} />
      </Routes>
      <footer className="bg-white text-center py-2 text-sm text-gray-500">
        FATEC 2025
      </footer>
    </BrowserRouter>
  );
}

export default App;
