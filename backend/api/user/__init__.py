#!/usr/bin/env python3
""" starting admin_routes and add user required function
		and create blueprint of user routes
"""
from flask import Blueprint
from flask_jwt_extended import get_jwt_identity
from models import Session
from models.user import User
from functools import wraps

# create new blueprint for user_routes of api
user_routes = Blueprint('user_routes', __name__, url_prefix='/api/user')


def user_required(fn):
	""" create function wapper that provide user required decroator """
	@wraps(fn)
	def wrapper(*args, **kwargs):
		user = Session.query(User).filter_by(id=get_jwt_identity()).first()
		if user:
			return fn(*args, **kwargs)
		else:
			return jsonify({'msg': 'User login required'}), 403
	return wrapper


# reload modules if this blueprint is requested
if __name__ == 'api.user':
	from api.user.appointment import *
	from api.user.auth import *
	from api.user.review import *
	from api.user.testimonial import *
	from api.user.user import *
