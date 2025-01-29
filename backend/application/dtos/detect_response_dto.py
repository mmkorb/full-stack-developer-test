from typing import List

class DetectResponseDTO:
    def __init__(self, timestamp: str, detections: List[dict]):
        self.timestamp = timestamp
        self.detections = detections

    @classmethod
    def from_predictions(cls, timestamp: str, predictions: List[dict]):
        return cls(timestamp=timestamp, detections=predictions)
    
    def to_dict(self):
        return {
            'timestamp': self.timestamp,
            'detections': self.detections
        }