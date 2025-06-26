# backend/models/speciality.py

"""
    module that create table of specialities inherite from Base
	of sqlalchemy and from Basemodel
"""

from models.base_model import Base, BaseModel
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship


class Speciality(BaseModel, Base):
	""" class or models to create specialities tables in databases
		Columns:
			name: string represent name of speciality (required field)
			main_price: integer preresent default price of examination (required field)
			doctors: relationship with doctors tables or Doctor model with back refrence
				speciality in doctor table
			offers: relationship with offers tables or Offer model with back refrence
				speciality in offers table
	"""
	__tablename__ = 'specialities'
	name = Column(String(128), nullable=False, unique=True)
	main_price = Column(Integer, nullable=False)
	doctors = relationship('Doctor', backref='speciality', cascade='all, delete-orphan', lazy="selectin")
	offers = relationship('Offer', backref='speciality', cascade='all, delete-orphan', lazy="selectin")
