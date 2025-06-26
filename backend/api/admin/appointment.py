#!/usr/bin/env python3
""" module for route of manipulate with appointment table
"""
from models import Session
from api.admin import admin_routes, admin_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from models.appointment import Appointment
from models.user import User
from models.speciality import Speciality
from models.doctor import Doctor
import base64


@admin_routes.route('/appointment/<appointment_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_appointment(appointment_id):
	""" update and delete appointment by it's id
			Return:
				- empty json with code 200 if delete request
				- json of new appoinment with code 200 if put request
	"""
	appointment = Session.query(Appointment).filter_by(id=appointment_id).first()
	if request.method == 'DELETE':
		Session.delete(appointment)
		Session.commit()
		return jsonify({}), 200
	else:
		data = request.get_json()
		appointment.update(**data)
		Session.commit()
		return jsonify(appointment.to_dict()), 200


@admin_routes.route('/appointment', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def get_all_appointment():
	""" get all appointemnts in tables
			Return:
				- json list of all appointements with code 200
	"""
	appointments = Session.query(Appointment).all()
	appointment_list = []
	for appoint in appointments:
		dict_appoint = appoint.to_dict()
		user = Session.query(User).filter_by(id=appoint.user_id).first()
		dict_appoint['user_name'] = user.full_name
		user_dict = user.to_dict()
		if user_dict.get('image'):
			image_data = base64.b64encode(user_dict['image']).decode('utf-8')
			dict_appoint['user_image'] = 'data:image/jpeg;base64,' + image_data
		else:
			dict_appoint['user_image'] = None
		doctor = Session.query(Doctor).filter_by(id=appoint.doctor_id).first()
		dict_appoint['doctor_name'] = doctor.full_name
		speciality = Session.query(Speciality).filter_by(id=doctor.speciality_id).first()
		dict_appoint['speciality'] = speciality.name
		appointment_list.append(dict_appoint)
	return jsonify(appointment_list), 200
