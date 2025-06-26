#!/usr/bin/env python3
""" module for route of manipulate with testimonial table
"""
from models import Session
from api.user import user_routes, user_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.testimonial import Testimonial


@user_routes.route('/testimonial', methods=['POST'], strict_slashes=False)
@jwt_required()
@user_required
def create_testimonial():
	""" create new testimonial record
			Return:
				- json of created testimonial with code 201
	"""
	data = request.get_json()
	data['user_id'] = get_jwt_identity()
	new_testimonial = Testimonial(**data)
	Session.add(new_testimonial)
	Session.commit()
	return jsonify(new_testimonial.to_dict()), 201


@user_routes.route('/testimonial/<testimonial_id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
@user_required
def delete_testimonial(testimonial_id):
	""" delete testimonial by it's id
			Return:
				- empty json with code 200
	"""
	testimonial = Session.query(Testimonial).filter_by(id=testimonial_id).first()
	Session.delete(testimonial)
	Session.commit()
	return jsonify({}), 200


@user_routes.route('/testimonial', methods=['GET'], strict_slashes=False)
@jwt_required()
@user_required
def get_testimonial():
	""" get all testimonials related to user now in tables
			Return:
				- json list of all testimonials with code 200
	"""
	testimonials = Session.query(Testimonial).filter_by(user_id=get_jwt_identity()).all()
	testimonial_dict = []
	for test in testimonials:
		testimonial_dict.append(test.to_dict())
	return jsonify(testimonial_dict), 200
