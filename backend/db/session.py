# backend/db/session.py

"""
    This module initializes the database session for the application using SQLAlchemy.
    It creates a scoped session factory that binds to the SQLAlchemy engine.
"""

from sqlalchemy.orm import scoped_session, sessionmaker
from db.engine import engine

session_factory = sessionmaker(bind=engine, expire_on_commit=False)
Session = scoped_session(session_factory)
