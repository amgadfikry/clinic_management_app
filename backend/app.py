# backend/app.py

""" 
    main module that start flask app and configuartion of it's
	blueprints and JWTManger
"""
import os
from dotenv import load_dotenv
from flask import Flask, jsonify
from db import Session, init_db
from utils import create_admin_if_not_exists
#from api.admin import admin_routes
#from api.user import user_routes
#from api.public import public_routes
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS

# load environment variables from .env file
load_dotenv()

# start Flask class
app = Flask('__name__')

# allow cors for api
CORS(app, resources={r'/api/*': {'origins': '*'}})

app.config['DEBUG'] = True

# add secret key to flask app
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'f5f57a3d68f6b5d5891285bf0b99f58874e76ade5cf8adc418ff2873ab136b53')

# add jwt secret key to secure access token
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'da9bf1fe5f672ddcea2f3d9634c31ce4d67d8b2d1fb61eac6f0ab29b81919f6fb')

# add expire time to access token of jwt
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)

# add flask app to JWTmanger class
jwt = JWTManager(app)

# initialize database
init_db()

# create admin credentials if not exists
create_admin_if_not_exists(Session)

@app.teardown_appcontext
def close(self):
    """
        close the session after each request
    """
    Session.close()

# register blueprints of admin_routes, user_routes and public_routes
#app.register_blueprint(admin_routes)
#app.register_blueprint(user_routes)
#app.register_blueprint(public_routes)

#test route to check if the server is running
@app.route('/api/v1/status', methods=['GET'])
def status():
    """ test route to check if the server is running """
    return jsonify({"message": "Server is running"}), 200

# test admin table has contents or not
from models.admin import Admin
@app.route('/api/v1/admin', methods=['GET'])
def admin():
    """ test route to check if the server is running """
    admin = Session.query(Admin).all()
    if admin:
        return admin[0].to_dict(), 200
    else:
        return jsonify({"message": "Admin table is empty"}), 200


if __name__ == '__main__':
    """ run flask app on localhost """
    port = os.getenv('SERVER_PORT', 5000)
    app.run(host='0.0.0.0', port=port, debug=True)
