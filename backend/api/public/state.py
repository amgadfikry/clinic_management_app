#!/usr/bin/env python3
""" module for route of check state of current user access website
"""
from models import Session
from flask import jsonify, request
from api.public import public_routes
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.user import User
from models.admin import Admin

@public_routes.route('/state', methods=['GET'], strict_slashes=False)
@jwt_required(optional=True)
def state_of_token():
	""" get state of current user
			Return:
				- json with type none if no access token with code 200
				- json with type user if toke conatin user id with code 200
				- json with type admin if toke conatin admin id with code 200
	"""
	try:
		token_id = get_jwt_identity()
		if token_id is None:
			return jsonify({'type': None}), 200
		user = Session.query(User).filter_by(id=token_id).first()
		if user:
			return jsonify({'type': 'user'}), 200
		admin = Session.query(Admin).filter_by(id=token_id).first()
		if admin:
			return jsonify({'type': 'admin'}), 200
		return jsonify({'type': None}), 200	
	except Exception:
		return jsonify({'type': None}), 200
