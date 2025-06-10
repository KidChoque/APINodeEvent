import { useState, useEffect } from "react";
import api, { eventsTypeResource } from "../services/Service";

function TipoEventosPage() {
  const [titulo, setTitulo] = useState("");
  const [lista, setLista] = useState([]);

  const carregarTipos = async () => {
    try {
      const res = await api.get(eventsTypeResource);
      setLista(res.data);
    } catch (error) {
      console.error("Erro ao carregar tipos de evento:", error);
    }
  };

  const cadastrarTipo = async (e) => {
    e.preventDefault();
    try {
      await api.post(eventsTypeResource, { nome: titulo });
      setTitulo("");
      carregarTipos();
    } catch (error) {
      console.error("Erro ao cadastrar tipo de evento:", error);
    }
  };

  useEffect(() => {
    carregarTipos();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 border-b-2 border-[#bd2043] inline-block">
        Cadastro Tipo de Eventos
      </h2>
      <form onSubmit={cadastrarTipo} className="space-y-3 max-w-md mb-6">
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border-b outline-none"
          placeholder="Título"
        />
        <button type="submit" className="bg-[#bd2043] text-white px-4 py-2 rounded">
          Cadastrar
        </button>
      </form>
      <h3 className="text-lg font-semibold mb-2">Lista Tipo de Eventos</h3>
      <ul className="space-y-1">
        {lista.map((tipo) => (
          <li key={tipo.id} className="bg-gray-100 p-2 rounded">
            {tipo.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TipoEventosPage;
