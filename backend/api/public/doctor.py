#!/usr/bin/env python3
""" module for route of manipulate with doctor table
"""
from models import Session
from flask import jsonify, request
from api.public import public_routes
from models.doctor import Doctor
from models.time import Time
from models.appointment import Appointment
from models.review import Review
from models.speciality import Speciality
import base64

@public_routes.route('/doctor', methods=['GET'], strict_slashes=False)
def get_all_doctors():
	""" get all doctors in tables with all details
			Return:
				- json list of all doctors with code 200 
	"""
	doctors = Session.query(Doctor).order_by(Doctor.full_name).all()
	doctors_dict = []
	for doc in doctors:
		doc_dict = doc.to_dict()
		if doc_dict.get('image'):
			image_data = base64.b64encode(doc_dict['image']).decode('utf-8')
			doc_dict['image'] = 'data:image/jpeg;base64,' + image_data
		speciality = Session.query(Speciality).filter_by(id=doc.speciality_id).first()
		doc_dict['speciality'] = speciality.to_dict()['name']
		stars = 0
		for review in doc.reviews:
			stars = stars + review.stars
		if len(doc.reviews):
			stars_result = stars / len(doc.reviews)
		else:
			stars_result = 0
		doc_dict['stars'] = stars_result
		doc_dict['reviews'] = [ r.to_dict() for r in doc.reviews]
		doc_dict['all_times'] = [ t.to_dict() for t in doc.all_times]
		doctors_dict.append(doc_dict)
	return jsonify(doctors_dict), 200



@public_routes.route('/doctor/<speciality_id>', methods=['GET'], strict_slashes=False)
def get_doctors_by_speciality(speciality_id):
	""" get all doctors in tables with all details with speciality id
			Return:
				- json list of all doctors with code 200
	"""
	doctors = Session.query(Doctor).filter_by(speciality_id=speciality_id).all()
	doctors_dict = []
	for doc in doctors:
		doc_dict = doc.to_dict()
		reviews_dict = []
		stars = 0
		for review in doc.reviews:
			stars = stars + review.stars
			reviews_dict.append(review.to_dict())
		if len(doc.reviews):
			stars_result = stars / len(doc.reviews)
		else:
			stars_result = 'Not rated yet'
		doc_dict['stars'] = stars_result
		doc_dict['reviews'] = reviews_dict
		times_dict = []
		for time in doc.all_times:
			times_dict.append(time.to_dict())
		doc_dict['all_times'] = times_dict
		doctors_dict.append(doc_dict)
	return jsonify(doctors_dict), 200
