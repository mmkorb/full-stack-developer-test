import { useState, useRef } from "react";
import apiService from '../services/apiService';

interface VideoPlayerProps {
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ title }) => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("Nenhum arquivo carregado");
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "video/mp4") {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setFileName(file.name);
    } else {
      alert("Por favor, carregue um vídeo no formato MP4.");
    }
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Ajustar o tamanho do canvas para o tamanho do vídeo
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Desenhar o frame atual do vídeo no canvas
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Converter a imagem do canvas para um Data URL (base64) em JPEG
      const imageData = canvas.toDataURL("image/jpeg"); 

      // Converter base64 para File
      const byteString = atob(imageData.split(',')[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
      const timestamp = video.currentTime.toString();
      const file = new File([uint8Array], "frame.jpg", { type: 'image/jpeg' });

      // Enviar o frame para o serviço
      apiService.objectDetectionService(file, timestamp)
        .then((response) => {
          console.log('Detecção de objetos:', response);
        })
        .catch((error) => {
          console.error('Erro ao enviar o frame:', error);
        });
    }
  };

  return (
    <div className="video-player">
      <h3>{title}</h3>
      {videoSrc ? (
        <video
          ref={videoRef}
          width="100%"
          controls
          onTimeUpdate={captureFrame} // Chama captureFrame sempre que o tempo do vídeo for atualizado
        >
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

      {/* Canvas invisível usado para capturar o frame */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default VideoPlayer;
