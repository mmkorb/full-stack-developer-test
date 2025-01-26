import React from "react";

export default function HomePage() {
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
            <h2 className="text-lg font-bold mb-2">Player Original</h2>
            {/* Substitua com seu componente de vídeo */}
            <div className="bg-gray-200 h-64 rounded">Video Player 1</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-bold mb-2">Player com Detecções</h2>
            {/* Substitua com seu componente de vídeo com bounding boxes */}
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
}
