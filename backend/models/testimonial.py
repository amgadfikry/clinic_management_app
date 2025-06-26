# backend/models/testimonial.py

"""
    module that create table of testimonials inherite from Base
	of sqlalchemy and from Basemodel
"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean


class Testimonial(BaseModel, Base):
	""" class or models to create reviews tables in databases
		Columns:
			user_id: string represent user id as foreign key (required field)
			details: long string represent review details (required field)
			stars: integer represent number of stars given to doctor in review (required field)
	"""
	__tablename__ = 'testimonials'
	user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
	stars = Column(Integer, nullable=False)
	details = Column(String(1024), nullable=False)
	live = Column(Boolean, nullable=False, default=False)
