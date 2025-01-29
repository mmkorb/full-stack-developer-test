from PIL import Image
from application.dtos.detect_request_dto import DetectRequestDTO
from application.dtos.detect_response_dto import DetectResponseDTO
from domain.services.detect_service import DetectService as DomainDetectService

class DetectService:
    def __init__(self):
        pass

    def detect_service(self, dto: DetectRequestDTO) -> DetectResponseDTO:
        image = dto.image
        timestamp = dto.timestamp
        confidence = dto.confidence
        iou = dto.iou
        
        pil_image = Image.open(image.stream).convert('RGB')
        detector = DomainDetectService()
        detections = detector.run_detection(pil_image, confidence, iou)

        response_dto = DetectResponseDTO(
            timestamp=timestamp,
            detections=detections
        )
        
        return response_dto
