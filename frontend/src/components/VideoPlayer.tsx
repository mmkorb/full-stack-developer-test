import { useState, useRef, useEffect } from "react";
import apiService, { Prediction, DetectionResponse } from "../services/apiService";
import config from "../config/config";

interface VideoPlayerProps {
  title: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ title }) => {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("Nenhum arquivo carregado");
  const [framesBuffer, setFramesBuffer] = useState<string[]>(Array(config.FRAMES_BUFFER_SIZE).fill(null));
  const [detectionsBuffer, setDetectionsBuffer] = useState<Prediction[][]>(
    Array(config.FRAMES_BUFFER_SIZE).fill([])
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timestampRef = useRef<string>("0:00:00");

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

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (ctx) {
        drawTimestamp(ctx, timestampRef.current, canvas.width);
      }

      const imageData = canvas.toDataURL("image/jpeg");
      const byteString = atob(imageData.split(",")[1]);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }

      const file = new File([uint8Array], `frame.jpg`, { type: "image/jpeg" });

      apiService
        .objectDetectionService(file, "frame")
        .then((response: DetectionResponse) => {
          const { detections } = response;
          drawImageOnCanvas(file, detections);
        })
        .catch((error) => {
          console.error("Erro ao enviar o frame:", error);
        });
    }
  };

  const drawTimestamp = (ctx: CanvasRenderingContext2D, timestamp: string, canvasWidth: number) => {
    ctx.font = "70px Arial";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    const textWidth = ctx.measureText(timestamp).width || 0;
    const x = canvasWidth - textWidth - 10;
    const y = 50;
    ctx.strokeText(timestamp, x, y);
    ctx.fillText(timestamp, x, y);
  };

  const drawImageOnCanvas = (file: File, detections: Prediction[]) => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const imgElement = new Image();
    imgElement.src = URL.createObjectURL(file);

    imgElement.onload = () => {
      const ctx = canvasElement.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(imgElement, 0, 0, canvasElement.width, canvasElement.height);

      detections.forEach(({ box: { left, top, width, height } }) => {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.strokeRect(left, top, width, height);
      });

      const processedFrame = canvasElement.toDataURL("image/jpeg");

      setFramesBuffer((prevBuffer) => {
        const newBuffer = prevBuffer.slice(1).concat(processedFrame);
        return newBuffer;
      });

      setDetectionsBuffer((prevDetectionsBuffer) => {
        const newBuffer = prevDetectionsBuffer.slice(1).concat([detections]);
        return newBuffer;
      });
    };
  };

  const formatTimestamp = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 1000);

    return `${minutes}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(3, "0")}`;
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", () => {
        const currentTime = videoRef.current?.currentTime ?? 0;
        timestampRef.current = formatTimestamp(currentTime);
        captureFrame();
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", captureFrame);
      }
    };
  }, [videoSrc]);

  return (
    <div className="video-player">
      <h3>{title}</h3>
      {videoSrc ? (
        <video
          ref={videoRef}
          width="100%"
          controls
          onPlay={() => {
            if (videoRef.current) {
              videoRef.current.playbackRate = config.VIDEO_PLAYBACKRATE;
            }
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Seu navegador não suporta a tag de vídeo.
        </video>
      ) : (
        <div className="bg-gray-200 h-64 rounded flex items-center justify-center">
          <span>Sem vídeo carregado</span>
        </div>
      )}

      <div className="mt-2 text-lg text-gray-700">
        <strong>Timestamp:</strong> {timestampRef.current}
      </div>

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
        <span className="ml-4 text-gray-700">{fileName}</span>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="mt-8 grid grid-cols-3 gap-4">
        {framesBuffer.map((frameData, index) => (
          <div
            key={index}
            className="border rounded p-4 bg-gray-100 flex flex-col justify-between"
          >
            <div className="h-48 flex justify-center items-center">
              {frameData ? (
                <img
                  src={frameData}
                  alt={`captured-frame-${index}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className="text-gray-500">Sem imagem</span>
              )}
            </div>

            <div className="mt-2">
              {detectionsBuffer[index] && detectionsBuffer[index].length > 0 ? (
                <ul className="text-sm text-gray-700 list-disc pl-4">
                  {detectionsBuffer[index].map((detection, dIndex) => (
                    <li key={dIndex}>
                      <strong>{detection.class_name}</strong> - Confiança:{" "}
                      {(detection.confidence * 100).toFixed(2)}%
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-500">Sem detecções</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;
