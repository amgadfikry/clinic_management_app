#!/usr/bin/env python3
""" module for route of manipulate with reviews table
"""
from models import Session
from api.user import user_routes, user_required
from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.review import Review


@user_routes.route('/review', methods=['POST'], strict_slashes=False)
@jwt_required()
@user_required
def create_review():
	""" create new review record
			Return:
				- json of created review with code 201
	"""
	data = request.get_json()
	data['user_id'] = get_jwt_identity()
	new_review = Review(**data)
	Session.add(new_review)
	Session.commit()
	return jsonify(new_review.to_dict()), 201


@user_routes.route('/review/<review_id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
@user_required
def delete_review(review_id):
	""" delete review by it's id
			Return:
				- empty json with code 200
	"""
	review = Session.query(Review).filter_by(id=review_id).first()
	Session.delete(review)
	Session.commit()
	return jsonify({}), 200


@user_routes.route('/review', methods=['GET'], strict_slashes=False)
@jwt_required()
@user_required
def get_review():
	""" get all reviews related to user now in tables
			Return:
				- json list of all reviews with code 200
	"""
	reviews = Session.query(Review).filter_by(user_id=get_jwt_identity()).all()
	review_dict = []
	for rev in reviews:
		review_dict.append(rev.to_dict())
	return jsonify(review_dict), 200
