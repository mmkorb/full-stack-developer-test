from flask import Flask
from flask_cors import CORS
from application.controllers.detect_controller import detect_controller

app = Flask(__name__)
CORS(app)

# Registrando o controlador (routes)
app.register_blueprint(detect_controller)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)