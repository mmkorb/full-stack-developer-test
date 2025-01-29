from typing import List
from PIL import Image
from hashlib import md5
from domain.services.model_service import ModelSingleton
from domain.repositories.detection_repository import DetectionRepository

class DetectService:
    def __init__(self):
        self.model = ModelSingleton.get_instance()

    def run_detection(self, image: Image, confidence: float, iou: float) -> List[dict]:
        predictions = self.model(image, confidence, iou)
        detections = [p.to_dict() for p in predictions]

        image_hash_md5 = md5(image.tobytes()).hexdigest()

        DetectionRepository.save_multiple_detections(detections, image_hash_md5, iou)

        return detections
