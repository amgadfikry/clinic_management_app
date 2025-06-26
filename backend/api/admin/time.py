#!/usr/bin/env python3
""" module for route of manipulate with times table
"""
from models import Session
from api.admin import admin_routes, admin_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from models.time import Time
from sqlalchemy import and_


@admin_routes.route('/time', methods=['POST'], strict_slashes=False)
@jwt_required()
@admin_required
def create_time():
	""" create new time record
			Return:
				- json of created time with code 201
	"""
	data = request.get_json()
	time = Session.query(Time).filter(
		and_(
			Time.day == data['day'],
			Time.start == data['start'],
			Time.end == data['end']
	)).first()
	if time:
		return jsonify({'error': 'Time add previously'})
	new_time = Time(**data)
	Session.add(new_time)
	Session.commit()
	return jsonify(new_time.to_dict()), 201


@admin_routes.route('/time/<time_id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_time(time_id):
	""" update and delete time by it's id
			Return:
				- empty json with code 200 if delete request
				- json of new time with code 200 if put request
	"""
	time = Session.query(Time).filter_by(id=time_id).first()
	Session.delete(time)
	Session.commit()
	return jsonify({}), 200


@admin_routes.route('/time', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def get_times():
	""" get all times in tables with all details
			Return:
				- json list of all times with code 200
	"""
	times = Session.query(Time).order_by(Time.day).all()
	time_list = [t.to_dict() for t in times]
	return jsonify(time_list), 200
	