# backend/models/time.py

"""
    module that create table of times inherite from Base
	of sqlalchemy and from Basemodel
"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import column_property


class Time(BaseModel, Base):
	""" class or models to create times tables in databases
		Columns:
			day: string represent day of clinic (required field)
			start: string represent start of clinic in hours 24 format (required field)
			end: string represent end of clinic in hours 24 format (required field)
			max_patients: calculate numbers of pateints in hours of work based on other columns values
	"""
	__tablename__ = 'times'
	day = Column(String(60), nullable=False)
	start = Column(Integer, nullable=False)
	end = Column(Integer, nullable=False)
	max_patients = column_property((end - start) * 60 / 10) 
