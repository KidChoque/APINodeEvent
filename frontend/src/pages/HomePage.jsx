function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center bg-[#bd2043] text-white min-h-[80vh]">
      <h1 className="text-5xl font-bold mb-4">EVENT+</h1>
      <p className="text-lg mb-8">Área de eventos da Escola de Informática</p>

      {/* ➤ Adicione aqui o caminho da imagem da Home */}
      <img src="../assets/undraw_zoom_in_-1-txs 1.png" alt="Ilustração" className="max-w-md" />
    </div>
  );
}

export default HomePage;
