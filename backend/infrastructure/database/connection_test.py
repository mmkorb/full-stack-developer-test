from sqlalchemy import text
from connection import get_session

with get_session() as session:
    try:
        result = session.execute(text("SELECT 1")).fetchall()
        print("Database connection successful!", result)
    except Exception as e:
        print("Error connecting to the database:", e)
