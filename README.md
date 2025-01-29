# Full-stack take-home test for Overview.ai

## Overview
This project is a full-stack application that showcases an AI object detection model's predictions through a user-friendly dashboard. 
The backend is built with Flask in Python, serving predictions from an ONNX model. 
The front end is developed using React and Fabric.js, providing an interactive interface to display the detected objects. 

## The Task
The task is to create a frontend that 
  - interfaces with the backend :white_check_mark:
  - plays a video file in a video player :white_check_mark:
  - sends each frame to the API for prediction :white_check_mark:
  - shows the results on the frontend :white_check_mark:
  - configuration area for model settings to be configured (such as IoU and Confidence Level) :white_check_mark:
  - a preview area where each bounding box returned by the model is drawn on top of the predicted frame (using Fabric.JS) :white_check_mark:
  - a table for the last 10 prediction results :white_check_mark:
  - each inference result should be saved to a Postgres database on the backend :white_check_mark:

### Prerequisites

- Python 3.8 or higher :white_check_mark:
- PostgreSQL :white_check_mark:

### API Endpoints

- **Detect Objects:**
  - Endpoint: `/detect_frontend`
  - Method: POST
  - Description: Receives an image file, confidence threshold, and IoU threshold and returns the detection results.
  - Example:
    - request:
    ```
    {
      "imageFile": "bus.jpg",
      "confidence": 0.7,
      "iou": 0.5
    }
    ```
    - response:
    ```
    [
      {
        "box": {"height": 503, "left": 50, "top": 400, "width": 195},
        "class_name": "person",
        "confidence": 0.9132577180862427
      },
      {
        "box": {"height": 489, "left": 668, "top": 391, "width": 140},
        "class_name": "person",
        "confidence": 0.9127665758132935
      },
      {
        "box": {"height": 515,  "left": 3, "top": 228,  "width": 805},
        "class_name": "bus",
        "confidence": 0.9017127752304077
      },
      {
        "box": {"height": 452, "left": 223,  "top": 407, "width": 121},
        "class_name": "person",
        "confidence": 0.8749434351921082
      }
    ]
    ```
## Architecture

- **Backend:** Flask application serving the AI model's predictions, built using Clean Architecture and Domain-Driven Design (DDD). :white_check_mark:
- **Frontend:** React application with Typescript and Fabric.js. :white_check_mark:
- **Database:** PostgreSQL is used to store user inputs and model predictions. :white_check_mark:


## Run
docker network create network_oai

### inside frontend
docker build -t frontend_oai .
docker run -p 3000:3000 --network network_oai frontend_oai

### after get postgres on docker hub
docker run --name postgres_oai -e POSTGRES_PASSWORD=oai -d -p 5432:5432 --network network_oai postgres

### inside frontend
docker build -t backend_oai .
docker run -p 5000:5000 --network network_oai backend_oai
