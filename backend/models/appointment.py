# backend/models/appointment.py

""" 
    module that create table of appointments inherite from Base
	of sqlalchemy and from Basemodel
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Integer, Boolean


class Appointment(BaseModel, Base):
	""" class or models to create appointments tables in databases
		Columns:
			user_id: string represent user id as foreign key (required field)
			doctor_id: string represent doctor id as foreign key (required field)
			date: datetime represent date and time of appointemnt (required field)
			price: price of doctor appointment (required field)
			attend: boolean value for patient attend or not (required field)
	"""
	__tablename__ = 'appointments'
	user_id = Column(String(60), ForeignKey('users.id'), index=True, nullable=False)
	doctor_id = Column(String(60), ForeignKey('doctors.id'), index=True, nullable=False)
	date = Column(String(60), nullable=False)
	price = Column(Integer, nullable=False)
	attend = Column(Boolean, nullable=False, default=False)
