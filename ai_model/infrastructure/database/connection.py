from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager

DB_USERNAME = "postgres"
DB_PASSWORD = "oai"
DB_HOST = "postgres_oai"
DB_PORT = "5432"
DB_NAME = "postgres"
DATABASE_URL = f"postgresql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@contextmanager
def get_session():
    session = Session()
    try:
        yield session
    finally:
        session.close()
