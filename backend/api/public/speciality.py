#!/usr/bin/env python3
""" module for route of manipulate with specialities table
"""
from models import Session
from api.public import public_routes
from flask import jsonify, request
from models.speciality import Speciality


@public_routes.route('/speciality', methods=['GET'], strict_slashes=False)
def get_all_specialitys():
	""" get all specialities in tables with all details
			Return:
				- json list of all specialities with code 200
	"""
	specialities = Session.query(Speciality).all()
	speciality_dict = []
	for speciality in specialities:
		speciality_dict.append(speciality.to_dict())
	return jsonify(speciality_dict), 200
