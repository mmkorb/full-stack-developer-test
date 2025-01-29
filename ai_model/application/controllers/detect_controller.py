from flask import Blueprint, request, jsonify
from application.services.detect_service import DetectService
from application.dtos.detect_request_dto import DetectRequestDTO
from application.dtos.detect_response_dto import DetectResponseDTO

detect_controller = Blueprint('detect_controller', __name__)

detect_service = DetectService()

@detect_controller.route('/detect_front', methods=['POST'])
def detect():
    try:
        request_dto: DetectRequestDTO = DetectRequestDTO.from_request(request)
        response_dto: DetectResponseDTO = detect_service.detect_service(request_dto)
        return jsonify(response_dto.to_dict()), 200
    
    except ValueError as er:
        return jsonify({'error': str(er)}), 400

    except Exception as er:
        print(er)
        return jsonify({'error': 'Internal Server Error', 'message': str(er)}), 500
