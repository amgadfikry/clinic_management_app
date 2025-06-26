#!/usr/bin/env python3
""" module for route of manipulate with appointment table
"""
from models import Session
from api.user import user_routes, user_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.appointment import Appointment
from models.doctor import Doctor
import base64


@user_routes.route('/appointment', methods=['POST'], strict_slashes=False)
@jwt_required()
@user_required
def create_appointment():
	""" create new appointment record
			Return:
				- json of created appointment with code 201
	"""
	data = request.get_json()
	data['user_id'] = get_jwt_identity()
	new_appointment = Appointment(**data)
	Session.add(new_appointment)
	Session.commit()
	return jsonify({}), 201


@user_routes.route('/appointment/<appointment_id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
@user_required
def delete_appointment(appointment_id):
	""" delete appointment by it's id
			Return:
				- empty json with code 200
	"""
	appointment = Session.query(Appointment).filter_by(id=appointment_id).first()
	Session.delete(appointment)
	Session.commit()
	return jsonify({}), 200


@user_routes.route('/appointment', methods=['GET'], strict_slashes=False)
@jwt_required()
@user_required
def get_appointment():
	""" get all appointemnts related to user now in tables
			Return:
				- json list of all appointments with code 200
	"""
	appointments = Session.query(Appointment).filter_by(user_id=get_jwt_identity()).all()
	appointment_list = []
	for app in appointments:
		app_dict = app.to_dict()
		doctor = Session.query(Doctor).filter_by(id=app.doctor_id).first()
		app_dict['doctor_name'] = doctor.full_name
		doctor_dict = doctor.to_dict()
		if doctor_dict.get('image'):
			image_data = base64.b64encode(doctor_dict['image']).decode('utf-8')
			app_dict['doctor_image'] = 'data:image/jpeg;base64,' + image_data
		appointment_list.append(app_dict)
	return jsonify(appointment_list), 200
