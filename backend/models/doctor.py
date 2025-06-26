# backend/models/doctor.py

""" 
    module that create table of doctors inherite from Base
	of sqlalchemy and from Basemodel
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey, LargeBinary, Table, Boolean
from sqlalchemy.orm import relationship


"""create secondary table that connect doctors table or Doctor model
	with times table or Time model
	Colums:
		doctor_id: string represent doctor id as foreign key (required field)
		time_id: string represent time id as foreign key (required field)
"""
doctor_time = Table(
	'doctor_time',
	Base.metadata,
	Column(
		'doctor_id',
		String(60),
		ForeignKey('doctors.id', onupdate='CASCADE', ondelete='CASCADE'),
		primary_key=True,
		nullable=False
	),
	Column(
		'time_id',
		String(60),
		ForeignKey('times.id', onupdate='CASCADE', ondelete='CASCADE'),
		primary_key=True,
		nullable=False
	)
)

class Doctor(BaseModel, Base):
	""" class or models to create doctors tables in database
		Columns:
			full_name: string represent doctor full name (required field)
			title: string represent title of doctor (required field)
			speciality_id: string represent speciality id as foreign key (required field)
			price: integer for price of examination (optional field)
			details: long string of details about doctor (required field)
			available: boolean represent if doctor is available or not (default to False)
			image: binary represent image of doctor (optional field)
			reviews: relationship with reviews tables or Review model with back refrence
				doctor in reviews table
			appointments: relationship with appointments tables or Appointment model with back refrence
				doctor in appointments table
			schedule: relationship with secondary table called doctor_time and back reference
				in times table with all_doctors
	"""
	__tablename__ = 'doctors'
	full_name = Column(String(256), nullable=False)
	speciality_id = Column(String(60), ForeignKey('specialities.id'), index=True, nullable=False)
	title = Column(String(128), nullable=False)
	image = Column(LargeBinary(length=(2**32)-1), nullable=True)
	price = Column(Integer, nullable=True)
	details = Column(String(1024), nullable=False)
	available = Column(Boolean, index=True, nullable=False, default=False)
	reviews = relationship("Review", backref="doctor", cascade='all, delete-orphan', lazy="selectin")
	appointments = relationship("Appointment", backref='doctor', lazy="selectin")
	schedule = relationship('Time', secondary='doctor_time', viewonly=False, backref='all_doctors', lazy="selectin")
