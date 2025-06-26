#!/usr/bin/env python3
""" module for route of manipulate with user table
"""
from models import Session
from api.user import user_routes, user_required
from flask import jsonify, request
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User


@user_routes.route('/edit', methods=['PUT'], strict_slashes=False)
@jwt_required()
@user_required
def edit_user():
	""" update user information
			Return:
				- json of new user updated onfo with code 200
	"""
	user = Session.query(User).filter_by(id=get_jwt_identity()).first()
	data = request.get_json()
	if data.get('password', None):
		data['password'] = generate_password_hash(data.get('password'), method='pbkdf2:sha256')
	user.update(**data)
	Session.commit()
	return jsonify(user.to_dict()), 200
