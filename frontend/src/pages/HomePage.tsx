import VideoPlayer from "../components/VideoPlayer";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* header */}
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold text-center">OverviewAI</h1>
      </header>

      {/* Principal */}
      <div className="p-4 space-y-6">
        {/* Division 1: Players */}
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-bold mb-2">Original video</h2>
            {/* Video component */}
            <VideoPlayer title="Original video"/>
          </div>
      </div>
    </div>
  );
};

export default HomePage;
