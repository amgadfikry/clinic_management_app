# backend/models/review.py

""" 
    module that create table of reviews inherite from Base
	of sqlalchemy and from Basemodel
"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Integer, ForeignKey


class Review(BaseModel, Base):
	""" class or models to create reviews tables in databases
		Columns:
			user_id: string represent user id as foreign key (required field)
			doctor_id: string represent doctor id as foreign key (required field)
			text: long string represent review details (optional field)
			stars: integer represent number of stars given to doctor in review (required field)
	"""
	__tablename__ = 'reviews'
	user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
	doctor_id = Column(String(60), ForeignKey('doctors.id', ondelete='CASCADE'), index=True, nullable=False)
	text = Column(String(1024), nullable=True)
	stars = Column(Integer, nullable=False)
