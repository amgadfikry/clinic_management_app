#!/usr/bin/env python3
""" module for route of manipulate with user table
"""
from models import Session
from api.admin import admin_routes, admin_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from models.user import User
from models.appointment import Appointment
from models.review import Review
from models.testimonial import Testimonial
from models.doctor import Doctor


@admin_routes.route('/user/<user_id>', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def get_user(user_id):
	""" get user with id
			Return:
				- json of user information with code 200
	"""
	user = Session.query(User).filter_by(id=user_id).first()
	user_dict = user.to_dict()
	reviews_dict = []
	for review in user.reviews:
		reviews_dict.append(review.to_dict())
	user_dict['reviews'] = reviews_dict
	appointments_dict = []
	for appointment in user.appointments:
		appointments_dict.append(appointment.to_dict())
	user_dict['appointments'] = appointments_dict
	testimonial_dict = []
	for testi in user.testimonials:
		testimonial_dict.append(testi.to_dict())
	user_dict['testimonials'] = testimonial_dict
	return jsonify(user_dict), 200


@admin_routes.route('/overview', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def get_overview():
	""" get overview information about all states
			Return:
				- json of user information with code 200
	"""
	doctors = Session.query(Doctor).all()
	users = Session.query(User).all()
	appointments= Session.query(Appointment).filter_by(attend=True).all()
	income = 0
	for app in appointments:
		income += app.price
	dict_result = [
		{'name': 'Total doctors', 'value': len(doctors)}, {'name': 'Total users', 'value': len(users)},
		{'name': 'Appointments', 'value': len(appointments)}, {'name': 'Total income', 'value': income}
	]
	return jsonify(dict_result), 200