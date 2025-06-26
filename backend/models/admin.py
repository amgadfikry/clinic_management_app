# backend/models/admin.py

""" 
    module that create table of admin inherite from Base
	of sqlalchemy and from Basemodel
"""

from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, LargeBinary


class Admin(BaseModel, Base):
	""" class or models to create admins tables in databases
		Columns:
			full_name: string represent admin full name (required field)
			admin_name: string represent admin user_name (required field)
			password:  hashed string represent password of admin (required field)
			email: string represent email of admin (required field)
			image: binary represent profile image of admin (optional field)
	"""
	__tablename__ = 'admins'
	full_name = Column(String(256), nullable=False)
	user_name = Column(String(256), nullable=False, unique=True)
	password = Column(String(256), nullable=False)
	email = Column(String(128), nullable=False, unique=True)
	image = Column(LargeBinary(length=(2**32)-1), nullable=True)
	