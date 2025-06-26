# backend/models/user.py

""" 
    module that create table of users inherite from Base
	of sqlalchemy and from Basemodel
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, LargeBinary
from sqlalchemy.orm import relationship


class User(BaseModel, Base):
	""" class or models to create users tables in databases
		Columns:
			full_name: string represent user full name (required field)
			user_name: string represent user user name (required field)
			password:  hashed string represent password of user (required field)
			email: string represent email of user (required field)
			image: binary represent profile image of user (optional field)
			reviews: relationship with reviews tables or Review model with back refrence
				user in reviews table
			appointments: relationship with appointments tables or Appointment model with back refrence
				user in appointments table
			testimonials: relationship with testimonials tables or Testimonial model with back refrence
				user in testimonials table
	"""
	__tablename__ = 'users'
	full_name = Column(String(256), nullable=False)
	user_name = Column(String(128), index=True, nullable=False, unique=True)
	password = Column(String(256), nullable=False)
	email = Column(String(128), index=True, nullable=False, unique=True)
	image = Column(LargeBinary(length=(2**32)-1), nullable=True)
	reviews = relationship("Review", backref="user", lazy="selectin")
	appointments = relationship("Appointment", backref='user', lazy="selectin")
	testimonials = relationship('Testimonial', backref='user', cascade='all, delete-orphan', lazy="selectin")
	