import axios from 'axios';
import config from '../config/config';

export interface BBOX {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface Prediction {
  class_name: string; 
  confidence: number;
  box: BBOX;
}

export interface DetectionResponse {
  timestamp: string; 
  detections: Prediction[]; 
}

const objectDetectionService = async (
  frameFile: File,           
  timestamp: string | number, 
  confidence: number = config.CONFIDENCE_THRESHOLD, 
  iou: number = config.IOU_THRESHOLD 
): Promise<DetectionResponse> => {  
  const formData = new FormData();
  formData.append('image', frameFile);  
  formData.append('timestamp', timestamp.toString()); 
  formData.append('confidence', confidence.toString()); 
  formData.append('iou', iou.toString());

  try {
    const response = await axios.post(config.API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 10000,  // Timeout de 10 segundos
    });
    return response.data as DetectionResponse;
  } catch (error) {
    console.error('Erro ao enviar o frame:', error);
    throw new Error('Erro ao enviar o frame');
  }
};

export default { objectDetectionService };
