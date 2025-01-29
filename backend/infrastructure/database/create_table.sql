CREATE TABLE predictions (
    id SERIAL PRIMARY KEY,                
    image_hash VARCHAR(255) NOT NULL,   
    class_name VARCHAR(255) NOT NULL,     
    confidence DECIMAL(5, 4) NOT NULL,   
    iou DECIMAL(5, 4) NOT NULL,   
    bbox_left DECIMAL(10, 2) NOT NULL,  
    bbox_top DECIMAL(10, 2) NOT NULL, 
    bbox_width DECIMAL(10, 2) NOT NULL,
    bbox_height DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
