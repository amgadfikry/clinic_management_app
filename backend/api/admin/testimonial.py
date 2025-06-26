#!/usr/bin/env python3
""" module for route of manipulate with testimonial table
"""
from models import Session
from api.admin import admin_routes, admin_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from models.testimonial import Testimonial
from models.user import User
import base64

@admin_routes.route('/testimonial/<testimonial_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_testimonial(testimonial_id):
	""" update and delete testimonial by it's id
			Return:
				- empty json with code 200 if delete request
				- json of new testimonial with code 200 if put request
	"""
	testimonial = Session.query(Testimonial).filter_by(id=testimonial_id).first()
	if request.method == 'DELETE':
		Session.delete(testimonial)
		Session.commit()
		return jsonify({}), 200
	else:
		data = request.get_json()
		testimonial.update(**data)
		Session.commit()
		return jsonify(testimonial.to_dict()), 200


@admin_routes.route('/testimonial', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def get_all_testimonials():
	""" get all testimonials in tables
			Return:
				- json list of all testimonials with code 200
	"""
	testimonials = Session.query(Testimonial).all()
	testimonial_list = []
	for testi in testimonials:
		dict_testimonial = testi.to_dict()
		user = Session.query(User).filter_by(id=testi.user_id).first()
		dict_testimonial['user_name'] = user.full_name
		user_dict = user.to_dict()
		if user_dict.get('image'):
			image_data = base64.b64encode(user_dict['image']).decode('utf-8')
			dict_testimonial['user_image'] = 'data:image/jpeg;base64,' + image_data
		else:
			dict_testimonial['user_image'] = None
		testimonial_list.append(dict_testimonial)
	return jsonify(testimonial_list), 200