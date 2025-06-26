#!/usr/bin/env python3
""" module for route of manipulate with reviews table
"""
from models import Session
from api.admin import admin_routes, admin_required
from flask import jsonify
from flask_jwt_extended import jwt_required
from models.review import Review


@admin_routes.route('/review/<review_id>', methods=['DELETE'], strict_slashes=False)
@jwt_required()
@admin_required
def delete_review(review_id):
	""" delete review by it's id
			Return:
				- empty json with code 200
	"""
	review = Session.query(Review).filter_by(id=review_id).first()
	Session.delete(review)
	Session.commit()
	return jsonify({}), 200
