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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-bold mb-2">Vídeo Original</h2>
            {/* Componente de vídeo */}
            <VideoPlayer title="Vídeo Original"/>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-bold mb-2">Vídeo com Detecções</h2>
            {/* Componente de vídeo com detecções */}
            <div className="bg-gray-200 h-64 rounded">Video Player 2</div>
          </div>
        </div>

        {/* Divisão 2: Grade de Detecções */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-4">Últimas 10 Detecções</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 h-24 rounded flex items-center justify-center"
              >
                Detecção {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Divisão 3: Grade de Frames */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-bold mb-4">
            Últimos 10 Frames com as Detecções
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 h-24 rounded flex items-center justify-center"
              >
                Frame {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
