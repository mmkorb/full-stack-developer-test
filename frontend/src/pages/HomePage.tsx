import VideoPlayer from "../components/VideoPlayer"; // Certifique-se de que o VideoPlayer está corretamente tipado

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cabeçalho */}
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold text-center">OverviewAI</h1>
      </header>

      {/* Conteúdo Principal */}
      <div className="p-4 space-y-6">
        {/* Divisão 1: Players */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-bold mb-2">Vídeo Original</h2>
            {/* Componente de vídeo */}
            <VideoPlayer title="Vídeo Original"/>
          </div>
      </div>
    </div>
  );
};

export default HomePage;
