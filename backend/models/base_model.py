# backend/models/base_model.py

""" 
    module of base_model class that hold all common features in all
	others models of sqlalchemy that represents tables
	as created at, updated at, id
"""

from uuid import uuid4
from datetime import datetime
from sqlalchemy import Column, String
from sqlalchemy.orm import declarative_base

# create base class for all models to inherit from
Base = declarative_base()


class BaseModel:
	"""
        model that is base for other models prepresents tables of database
		using sqlalchemy
		Columns:
			id: represnt id column in table using uuid library (required field , unique field)
			created_at: represend date of creation of new row in table using datetime library (required field)
			updated_at: represend updated date when update row in table using datetime library (required field)
	"""
	id = Column(String(60), primary_key=True, nullable=False, unique=True)
	created_at = Column(String(60), nullable=False)
	updated_at = Column(String(60), nullable=False)


	def __init__(self, *args, **kwargs):
		""" 
            init magic method that initate the new value in start of class
			if new instance create new value
			if provide dictionary of value set values to column and pass key values that not part from models as table_name
			Params:
				*args: list of arguments of function
				**kwargs: dictionary of values that add to rows
		"""
		for key, value in kwargs.items():
			if key not in ['table_name']:
				setattr(self, key, value)
		if kwargs.get('created_at'):
			self.created_at = kwargs['created_at']
		else:
			self.created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
		if kwargs.get('updated_at'):
			self.updated_at = kwargs['updated_at']
		else:
			self.updated_at = self.created_at
		if kwargs.get('id'):
			self.id = kwargs['id']
		else:
			self.id = str(uuid4())


	def to_dict(self):
		""" 
            instance public method that convert class to dictionary with
			add new dict key and value represent table name
			Returns:
                new_dict: dictionary of class with all attributes and values
                except password and _sa_instance_state
		"""
		new_dict = {}
		new_dict.update(self.__dict__)
		if new_dict.get('password'):
			del new_dict['password']
		if '_sa_instance_state' in new_dict:
			del new_dict['_sa_instance_state']
		new_dict['table_name'] = self.__tablename__
		return new_dict


	def update(self, *args, **kwargs):
		""" public instance method that update value in model and update updated_at value
			Params:
				key: represent key or column name in table
				value: represent new value to update it
		"""
		for key, value in kwargs.items():
			if key == 'updated_at':
				time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
				setattr(self, 'updated_at', time)
			else:
				setattr(self, key, value) 
