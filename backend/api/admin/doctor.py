#!/usr/bin/env python3
""" module for route of manipulate with doctor table
"""
from models import Session
from api.admin import admin_routes, admin_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from models.doctor import Doctor
from models.time import Time
from models.appointment import Appointment
from models.review import Review
from models.speciality import Speciality
import base64


@admin_routes.route('/doctor', methods=['POST'], strict_slashes=False)
@jwt_required()
@admin_required
def create_doctor():
	""" create new doctor record
			Return:
				- json of created doctor with code 201
	"""
	data = request.get_json()
	if data.get('image'):
		image_data = data['image'].split(',')[1]
		data['image'] = base64.b64decode(image_data)
	new_doctor = Doctor(**data)
	Session.add(new_doctor)
	Session.commit()
	return jsonify({}), 201


@admin_routes.route('/doctor/<doctor_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_doctor(doctor_id):
	""" update and delete doctor by it's id
			Return:
				- empty json with code 200 if delete request
				- json of new doctor with code 200 if put request
	"""
	doctor = Session.query(Doctor).filter_by(id=doctor_id).first()
	if request.method == 'DELETE':
		Session.delete(doctor)
		Session.commit()
		return jsonify({}), 200
	else:
		data = request.get_json()
		if data.get('image'):
			image_data = data['image'].split(',')[1]
			data['image'] = base64.b64decode(image_data)
		doctor.update(**data)
		Session.commit()
		return jsonify({}), 200


@admin_routes.route('/doctor/times/<doctor_id>', methods=['PUT'], strict_slashes=False)
@jwt_required()
@admin_required
def add_times(doctor_id):
	""" add new time record to record or remove it
			Return:
				- empty json with code 200 if delete request
				- json of time added with code 200 if patch request
	"""
	doctor = Session.query(Doctor).filter_by(id=doctor_id).first()
	data = request.get_json()
	for time_id in data:
		t = Session.query(Time).filter_by(id=time_id).first()
		if t in doctor.all_times:
			print("")
		else:
			doctor.all_times.append(t)
	Session.commit()
	return jsonify({}), 200


@admin_routes.route('/doctor/times/<doctor_id>/<time_id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def delete_times(doctor_id, time_id):
	""" delete  time record from doctor record
			Return:
				- empty json with code 200 if delete request
	"""
	doctor = Session.query(Doctor).filter_by(id=doctor_id).first()
	time = Session.query(Time).filter_by(id=time_id).first()
	doctor.all_times.remove(time)
	Session.commit()
	return jsonify({}), 200


@admin_routes.route('/doctor', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
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
		doc_dict['speciality'] = speciality.to_dict()
		stars = 0
		for review in doc.reviews:
			stars = stars + review.stars
		if len(doc.reviews):
			stars_result = stars / len(doc.reviews)
		else:
			stars_result = 'New doctor'
		doc_dict['stars'] = stars_result
		doc_dict['reviews'] = [ r.to_dict() for r in doc.reviews]
		visits = [ v for v in doc.appointments if v.attend]
		doc_dict['visits'] = len(visits)
		doc_dict['appointments'] = [ a.to_dict() for a in doc.appointments]
		doc_dict['all_times'] = [ t.to_dict() for t in doc.all_times]
		doctors_dict.append(doc_dict)
	return jsonify(doctors_dict), 200


@admin_routes.route('/doctor/<time_id>', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def get_doctors_by_time(time_id):
	""" get all doctor by specific time id
			Return:
				- json list of all doctors with code 200
	"""
	time = Session.query(Time).filter_by(id=time_id).first()
	doctors_dict = []
	for doc in time.all_doctors:
		doc_dict = doc.to_dict()
		doc_dict['speciality_id'] = Session.query(Speciality).filter_by(id=doc.speciality_id).first().to_dict()
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
		appointments_dict = []
		for appointment in doc.appointments:
			appointments_dict.append(appointment.to_dict())
		doc_dict['appointments'] = appointments_dict
		doctors_dict.append(doc_dict)
	return jsonify(doctors_dict), 200
