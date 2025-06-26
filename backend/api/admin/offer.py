#!/usr/bin/env python3
""" module for route of manipulate with offers table
"""
from models import Session
from api.admin import admin_routes, admin_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from models.offer import Offer
import base64


@admin_routes.route('/offer', methods=['POST'], strict_slashes=False)
@jwt_required()
@admin_required
def create_offer():
	""" create new offer
			Return:
				- json of created offer with code 201
	"""
	data = request.get_json()
	if data.get('image'):
		image_data = data['image'].split(',')[1]
		data['image'] = base64.b64decode(image_data)
	new_offer = Offer(**data)
	Session.add(new_offer)
	Session.commit()
	return jsonify({}), 200

@admin_routes.route('/offer/<offer_id>', methods=['PUT', 'DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def manipulate_offer(offer_id):
	""" update and delete offer by it's id
			Return:
				- empty json with code 200 if delete request
				- json of new doctor with code 200 if put request
	"""
	offer = Session.query(Offer).filter_by(id=offer_id).first()
	if request.method == 'DELETE':
		Session.delete(offer)
		Session.commit()
		return jsonify({}), 200
	else:
		data = request.get_json()
		if data.get('image'):
			image_data = data['image'].split(',')[1]
			data['image'] = base64.b64decode(image_data)
		if data.get('speciality'):
			del data['speciality']
		if data.get('percentage'):
			del data['percentage']
		offer.update(**data)
		Session.commit()
		return jsonify({}), 200


@admin_routes.route('/offer', methods=['GET'], strict_slashes=False)
@jwt_required()
@admin_required
def get_all_offers():
	""" get list of all offers
			Return:
				list of dictionaries if offers
	"""
	offers = Session.query(Offer).order_by(Offer.title).all()
	offer_list =[]
	for offer in offers:
		dic = offer.to_dict()
		if dic.get('image'):
			image_data = base64.b64encode(dic['image']).decode('utf-8')
			dic['image'] = 'data:image/jpeg;base64,' + image_data
		dic['speciality'] = offer.speciality.to_dict()
		dic['percentage'] = offer.percentage
		offer_list.append(dic)
	return jsonify(offer_list)