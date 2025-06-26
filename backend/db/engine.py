# backend/db/engine.py

"""
    This module initializes import the database credetials from environment variables,
    creates a SQLAlchemy engine, and defines a function to initialize the database by creating all tables.
"""
import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from models import Base 

load_dotenv()

db_user = os.getenv('MYSQL_USER')
db_password = os.getenv('MYSQL_PASSWORD')
db_port = os.getenv('MYSQL_PORT')
db_host = os.getenv('MYSQL_HOST', 'localhost')
db_name = os.getenv('MYSQL_DATABASE')

db_url = f'mysql+mysqldb://{db_user}:{db_password}@mysql:{db_port}/{db_name}'

engine = create_engine(db_url, echo=False)

def init_db():
    """Create all tables in the database."""
    Base.metadata.create_all(engine)
