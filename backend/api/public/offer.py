#!/usr/bin/env python3
""" module for route of manipulate with offers table
"""
from models import Session
from api.public import public_routes
from flask import jsonify, request
from models.offer import Offer
import base64

@public_routes.route('/offer', methods=['GET'], strict_slashes=False)
def get_all_offers():
	""" get all offers in tables with all details
			Return: 
				- json list of all offers with code 200
	"""
	offers = Session.query(Offer).order_by(Offer.title).all()
	offer_list =[]
	for offer in offers:
		dic = offer.to_dict()
		if dic.get('image'):
			image_data = base64.b64encode(dic['image']).decode('utf-8')
			dic['image'] = 'data:image/jpeg;base64,' + image_data
		dic['speciality'] = offer.speciality.to_dict()['name']
		dic['percentage'] = offer.percentage
		offer_list.append(dic)
	return jsonify(offer_list)
