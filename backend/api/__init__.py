""" module hold functions neccssary for all api project """
from werkzeug.security import check_password_hash


def check_change_password(data, password):
	""" check password for changes
			params:
				- dictoary of password new and old
			return:
				- error dictionary if there is error
				- empty dictionary if no error
	"""
	error_dic = {}
	if not check_password_hash(password, data.get('current_password')):
		error_dic['current_password'] = 'Incorrect Password'
	if check_password_hash(password, data.get('new_password')):
		error_dic['new_password'] = 'The same old password'
	if error_dic:
		error_dic['all'] = 'Check input requirements'
	return error_dic
