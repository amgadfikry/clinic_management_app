#!/usr/bin/env python3
""" module for route of authentication of user to dashboard
"""
from models import Session
from api.user import user_routes, user_required
from flask import jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.user import User
from models.appointment import Appointment
from models.review import Review
from models.testimonial import Testimonial
import base64
from api import check_change_password

@user_routes.route('/signup', methods=['POST'], strict_slashes=False)
def signup():
	""" signup user and create new user
			Return:
				- json of msg successfull signup
	"""
	data = request.get_json()
	user = Session.query(User).filter_by(user_name=data['user_name']).first()
	if user:
		return jsonify({'error': 'Exist user name'}), 200
	user = Session.query(User).filter_by(email=data['email']).first()
	if user:
		return jsonify({'error': 'Exist email address'}), 200
	data['password'] = generate_password_hash(data.get('password'), method='scrypt')
	new_user = User(**data)
	Session.add(new_user)
	Session.commit()
	return jsonify({'msg': 'signup success'}), 201


@user_routes.route('/signin', methods=['POST'], strict_slashes=False)
def signin():
	""" sign in user and create access token
			Return:
				- json of new access token with code 201 if successfull signin
				- json with msg if faild signin with code 401 if failed signin
	"""
	email = request.json.get('email', None)
	password = request.json.get('password', None)
	user = Session.query(User).filter_by(email=email).first()
	if user and check_password_hash(user.password, password):
		access_token = create_access_token(identity=user.id)
		return jsonify({'access_token': access_token}), 201
	else:
		return jsonify({'error': 'Invalid user name or password'}), 200



@user_routes.route('/state', methods=['GET'], strict_slashes=False)
@jwt_required()
@user_required
def user_state():
	""" get state of current user
			Return:
				- json of user dictionary information with code 200
	"""
	user = Session.query(User).filter_by(id=get_jwt_identity()).first()
	user_data = user.to_dict()
	if user_data.get('image'):
		image_data = base64.b64encode(user_data['image']).decode('utf-8')
		user_data['image'] = 'data:image/jpeg;base64,' + image_data
	return jsonify(user_data), 200


@user_routes.route('/update', methods=['PUT'], strict_slashes=False)
@jwt_required()
@user_required
def update_info():
	""" change user info in database
			Return:
			json of new data of user
	"""
	user = Session.query(User).filter_by(id=get_jwt_identity()).first()
	data = request.get_json()
	if data.get('image'):
		image_data = data['image'].split(',')[1]
		data['image'] = base64.b64decode(image_data)
	user.update(**data)
	Session.commit()
	user_data = user.to_dict()
	if user_data.get('image'):
		image_data = base64.b64encode(user_data['image']).decode('utf-8')
		user_data['image'] = 'data:image/jpeg;base64,' + image_data
	return jsonify(user_data), 200


@user_routes.route('/password', methods=['PUT'], strict_slashes=False)
@jwt_required()
@user_required
def password():
	""" change user info in database
			Return:
			json of new data of user
	"""
	user = Session.query(User).filter_by(id=get_jwt_identity()).first()
	data = request.get_json()
	errors = check_change_password(data, user.password)
	if errors:
		return jsonify({'error': errors}), 200
	correct_data = {"password": generate_password_hash(data.get('new_password'), method='scrypt')}
	user.update(**correct_data)
	Session.commit()
	return jsonify({}), 200
