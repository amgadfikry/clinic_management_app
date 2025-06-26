#!/usr/bin/env python3
""" module for route of manipulate with testimonial table
"""
from models import Session
from flask import jsonify, request
from api.public import public_routes
from models.testimonial import Testimonial
from models.user import User
import base64


@public_routes.route('/testimonial', methods=['GET'], strict_slashes=False)
def get_all_testimonials():
	""" get all testimonials which is live in tables with all details
			Return:
				- json list of all testimonials with code 200
	"""
	testimonials = Session.query(Testimonial).filter_by(live=True).all()
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