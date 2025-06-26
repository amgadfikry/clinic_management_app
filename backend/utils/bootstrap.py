# backend/utils/bootstrap.py

"""
    This module create admin credentials for the first time
"""

from werkzeug.security import generate_password_hash
from models import Admin
from dotenv import load_dotenv
import os


def create_admin_if_not_exists(session):
	""" 
		function that responsible about create credentials that allow admin manage it's dashboard for the first time
		create admin with email, name, password, user_name and add it to table of admins if not exists
		Parameters:
			session: SQLAlchemy session object to interact with the database
		Returns:
			None
		Exceptions:
			Exception: If an error occurs during the database operation, it will be caught and printed.
	"""
	load_dotenv()
	env_mode = os.getenv("ENV", "dev")
	if env_mode != "dev":
		print("Skipping admin creation in non-development environment.")
		return
	
	try:
		admin_exist = session.query(Admin).filter_by(user_name="admin").first()
		if not admin_exist:
			admin_data = {
				'full_name': 'admin admin',
				'email': 'admin@example.com',
				'password': generate_password_hash('admin', method='scrypt'),
				'user_name': 'admin'
			}
			new_admin = Admin(**admin_data)
			session.add(new_admin)
			session.commit()
			print("Admin created successfully.")
		else:
			print("Admin already exists.")
	except Exception as e:
		session.rollback()
		print(f"An error occurred: {e}")
	finally:
		session.remove()
