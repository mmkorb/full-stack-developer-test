from sqlalchemy import text
from typing import List
from infrastructure.database.connection import get_session

class DetectionRepository:
    
    @staticmethod
    def save_single_detection(detection_data: dict, image_hash_md5: str, iou: float):
        try:
            with get_session() as session:
                sql = text("""
                INSERT INTO predictions (image_hash, class_name, iou, confidence, bbox_left, bbox_top, bbox_width, bbox_height)
                VALUES (:image_hash, :class_name, :confidence, :iou, :bbox_left, :bbox_top, :bbox_width, :bbox_height)
                """)
                values = {
                    'image_hash': image_hash_md5,
                    'class_name': detection_data['class_name'],
                    'confidence': detection_data['confidence'],
                    'iou': iou,
                    'bbox_left': detection_data['box']['left'],
                    'bbox_top': detection_data['box']['top'],
                    'bbox_width': detection_data['box']['width'],
                    'bbox_height': detection_data['box']['height']
                }
                
                session.execute(sql, values)
                session.commit()
        except Exception as er:
            raise er

    @staticmethod
    def save_multiple_detections(detections: List[dict], image_hash_md5: str, iou: float):
        try:
            with get_session() as session:
                sql = text("""
                INSERT INTO predictions (image_hash, class_name, iou, confidence, bbox_left, bbox_top, bbox_width, bbox_height)
                VALUES (:image_hash, :class_name, :confidence, :iou, :bbox_left, :bbox_top, :bbox_width, :bbox_height)
                """)
                for detection_data in detections:
                    values = {
                        'image_hash': image_hash_md5,
                        'class_name': detection_data['class_name'],
                        'confidence': detection_data['confidence'],
                        'iou': iou,
                        'bbox_left': detection_data['box']['left'],
                        'bbox_top': detection_data['box']['top'],
                        'bbox_width': detection_data['box']['width'],
                        'bbox_height': detection_data['box']['height']
                    }
                    
                    session.execute(sql, values)
                session.commit()
        except Exception as er:
            raise er
