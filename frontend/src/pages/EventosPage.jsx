import { useState, useEffect } from "react";
import api, { eventsResource, eventsTypeResource } from "../services/Service";

function EventosPage() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [organizador, setOrganizador] = useState("");
  const [cpf, setCpf] = useState("");
  const [tipoId, setTipoId] = useState("");
  const [tipos, setTipos] = useState([]);
  const [lista, setLista] = useState([]);
  const [erroCpf, setErroCpf] = useState(""); // 👈 estado para erro do CPF

  const carregarDados = async () => {
    try {
      const [resTipos, resEventos] = await Promise.all([
        api.get(eventsTypeResource),
        api.get(eventsResource),
      ]);
      setTipos(resTipos.data);
      setLista(resEventos.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const cadastrarEvento = async (e) => {
    e.preventDefault();
    setErroCpf(""); // limpa erro anterior

    const novoEvento = {
      nome,
      descricao,
      nomeOrganizador: organizador,
      cpfOrganizador: cpf,
      tipoEventoId: tipoId,
    };

    try {
      await api.post(eventsResource, novoEvento);

      setNome("");
      setDescricao("");
      setOrganizador("");
      setCpf("");
      setTipoId("");

      carregarDados();
    } catch (error) {
      if (error.response?.data?.error === "CPF inválido.") {
        setErroCpf("CPF inválido."); // 👈 define mensagem se CPF for inválido
      } else {
        console.error("Erro ao cadastrar evento:", error);
      }
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 border-b-2 border-[#bd2043] inline-block">
        Cadastro de Evento
      </h2>
      <form onSubmit={cadastrarEvento} className="space-y-3 mb-6 max-w-md">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full border-b outline-none"
          placeholder="Nome"
        />
        <input
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border-b outline-none"
          placeholder="Descrição"
        />
        <select
          value={tipoId}
          onChange={(e) => setTipoId(e.target.value)}
          className="w-full border-b outline-none"
        >
          <option value="">Selecione o Tipo</option>
          {tipos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </select>
        <input
          value={organizador}
          onChange={(e) => setOrganizador(e.target.value)}
          className="w-full border-b outline-none"
          placeholder="Nome do Organizador"
        />
        <input
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="w-full border-b outline-none"
          placeholder="CPF do Organizador"
        />
        <button type="submit" className="bg-[#bd2043] text-white px-4 py-2 rounded">
          Cadastrar
        </button>

        {/* Mensagem de erro abaixo do botão */}
        {erroCpf && (
          <div className="text-red-600 font-medium mt-2">{erroCpf}</div>
        )}
      </form>

      <h3 className="text-lg font-semibold mb-2">Lista de Eventos</h3>
      <ul className="space-y-1">
        {lista.map((ev) => (
          <li key={ev.id} className="bg-gray-100 p-2 rounded">
            {ev.nome} - {ev.tipoEvento?.nome ?? "Tipo não carregado"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventosPage;
