from typing import Optional
from werkzeug.datastructures import FileStorage

class DetectRequestDTO:
    def __init__(self, image: FileStorage, timestamp: str, confidence: float, iou: float):
        self.image = image
        self.timestamp = timestamp
        self.confidence = confidence
        self.iou = iou

    @classmethod
    def from_request(cls, request) -> 'DetectRequestDTO':
        image = request.files.get('image')
        timestamp = request.form.get('timestamp')
        confidence = request.form.get('confidence', type=float)
        iou = request.form.get('iou', type=float)

        if not image:
            raise ValueError("No image part")
        if not timestamp:
            raise ValueError("Timestamp is required")
        if confidence is None or iou is None:
            raise ValueError("Confidence and IOU values are required")

        return cls(image=image, timestamp=timestamp, confidence=confidence, iou=iou)

