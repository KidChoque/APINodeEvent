import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-[#bd2043]">
        EVENT<span className="text-black">+</span>
      </div>
      <div className="flex gap-[10px]">
        <Link to="/" className="text-gray-700 hover:text-[#bd2043] font-medium">Home</Link>
        <Link to="/tipoeventos" className="text-gray-700 hover:text-[#bd2043] font-medium">TipoEvento</Link>
        <Link to="/eventos" className="text-gray-700 hover:text-[#bd2043] font-medium">Eventos</Link>
      </div>
    </nav>
  );
}

export default Navbar;
