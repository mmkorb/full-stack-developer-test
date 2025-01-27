import { useState } from "react";
import FrameGrid from './FrameGrid';

interface VideoPlayerProps {
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ title }) => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);  // O estado pode ser uma string ou null
  const [fileName, setFileName] = useState<string>("Nenhum arquivo carregado");  // O estado é uma string

  // Tipando o evento como React.ChangeEvent<HTMLInputElement>
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];  // Verifica se o arquivo foi selecionado
    if (file && file.type === "video/mp4") {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setFileName(file.name);
    } else {
      alert("Por favor, carregue um vídeo no formato MP4.");
    }
  };

  return (
    <div className="video-player">
      <h3>{title}</h3>
      {videoSrc ? (
        <video width="100%" controls>
          <source src={videoSrc} type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
      ) : (
        <div className="bg-gray-200 h-64 rounded flex items-center justify-center">
          <span>Sem vídeo carregado</span>
        </div>
      )}

      {/* Container para o botão e nome do arquivo */}
      <div className="mt-4 flex items-center">
        <label
          htmlFor="video-upload"
          className="p-2 bg-gray-300 text-gray-700 rounded cursor-pointer flex items-center justify-center w-auto"
        >
          Carregar MP4
        </label>
        <input
          id="video-upload"
          type="file"
          accept="video/mp4"
          onChange={handleVideoUpload}
          className="hidden"
        />
        
        {/* Nome do arquivo */}
        <span className="ml-4 text-gray-700">{fileName}</span>
      </div>
    </div>
  );
};

export default VideoPlayer;
