#!/usr/bin/env python3
""" module for route of authentication of admin to dashboard
"""
from models import Session
from api.admin import admin_routes, admin_required
from flask import jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from models.admin import Admin
from api import check_change_password
import base64


@admin_routes.route('/signin', methods=['POST'], strict_slashes=False)
def signin():
	""" sign in admin and create access token
			Return:
				- json of new access token with code 201 if successfull signin
				- json with msg if faild signin with code 401 if failed signin
	"""
	email = request.json.get('email', None)
	password = request.json.get('password', None)
	admin = Session.query(Admin).filter_by(email=email).first()
	if admin and check_password_hash(admin.password, password):
		access_token = create_access_token(identity=admin.id)
		return jsonify({'access_token': access_token}), 201
	else:
		return jsonify({'error': 'Invalid user name or password'}), 401


@admin_routes.route('/state', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def admin_state():
	""" get state of current admin
			Return:
				- json of admin dictionary information with code 200
	"""
	admin = Session.query(Admin).filter_by(id=get_jwt_identity()).first()
	admin_data = admin.to_dict()
	if admin_data.get('image'):
		image_data = base64.b64encode(admin_data['image']).decode('utf-8')
		admin_data['image'] = 'data:image/jpeg;base64,' + image_data
	return jsonify(admin_data), 200


@admin_routes.route('/update', methods=['PUT'], strict_slashes=False)
@jwt_required()
@admin_required
def update_info():
	""" change admin info in database
			Return:
			json of new data of admin
	"""
	admin = Session.query(Admin).filter_by(id=get_jwt_identity()).first()
	data = request.get_json()
	if data.get('image'):
		image_data = data['image'].split(',')[1]
		data['image'] = base64.b64decode(image_data)
	admin.update(**data)
	Session.commit()
	admin_data = admin.to_dict()
	if admin_data.get('image'):
		image_data = base64.b64encode(admin_data['image']).decode('utf-8')
		admin_data['image'] = 'data:image/jpeg;base64,' + image_data
	return jsonify(admin_data), 200


@admin_routes.route('/password', methods=['PUT'], strict_slashes=False)
@jwt_required()
@admin_required
def password():
	""" change admin info in database
			Return:
			json of new data of admin
	"""
	admin = Session.query(Admin).filter_by(id=get_jwt_identity()).first()
	data = request.get_json()
	errors = check_change_password(data, admin.password)
	if errors:
		return jsonify({'error': errors}), 200
	correct_data = {"password": generate_password_hash(data.get('new_password'), method='scrypt')}
	admin.update(**correct_data)
	Session.commit()
	return jsonify(admin.to_dict()), 200