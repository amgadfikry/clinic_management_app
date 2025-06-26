# backend/db/__init__.py

"""
    This module initializes the database connection and create session for the application.
"""

from db.engine import init_db
from db.session import Session
