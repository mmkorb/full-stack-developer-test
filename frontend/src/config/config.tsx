interface Config {
  FRAMES_BUFFER_SIZE: number;
  DETECTIONS_BUFFER_SIZE: number;
  API_URL: string;
  CONFIDENCE_THRESHOLD: number;
  IOU_THRESHOLD: number;
  VIDEO_PLAYBACKRATE: number;
}

const config: Config = {
  FRAMES_BUFFER_SIZE: 10,
  DETECTIONS_BUFFER_SIZE: 10,
  API_URL: "http://localhost:5000/detect_front",
  CONFIDENCE_THRESHOLD: 0.5,
  IOU_THRESHOLD: 0.5,
  VIDEO_PLAYBACKRATE: 0.1
};

export default config;
