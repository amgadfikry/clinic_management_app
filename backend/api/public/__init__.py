#!/usr/bin/env python3
""" starting admin_routes and add public required function
		and create blueprint of public routes
"""
from flask import Blueprint
from models import Session

# create new blueprint for public route of api
public_routes = Blueprint('public_routes', __name__, url_prefix='/api/public')


# reload modules if this blueprint is requested
if __name__ == 'api.public':
	from api.public.testimonial import *
	from api.public.offer import *
	from api.public.doctor import *
	from api.public.speciality import *
	from api.public.state import *
