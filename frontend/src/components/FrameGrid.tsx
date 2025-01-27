interface FrameGridProps {
  frames: string[];  // 'frames' é um array de strings (URLs ou caminhos das imagens)
}

const FrameGrid: React.FC<FrameGridProps> = ({ frames }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {frames.map((frame, index) => (
        <div key={index} className="border p-2">
          <img src={frame} alt={`Frame ${index}`} className="w-full h-auto" />
        </div>
      ))}
    </div>
  );
};

export default FrameGrid;
