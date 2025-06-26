# backend/models/__init__.py

"""
    This module contains the initialization logic for the models in the application.
    It imports all the necessary models
"""

from models.base_model import Base
from models.user import User
from models.appointment import Appointment
from models.doctor import Doctor
from models.review import Review
from models.speciality import Speciality
from models.time import Time
from models.offer import Offer
from models.testimonial import Testimonial
from models.admin import Admin
