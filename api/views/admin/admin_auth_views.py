from api.views import gis
from flask import jsonify
from api.services.admin.admin_auth_service import login_user
from api.util.requests import get_required_value, get_value


@gis.route('/v1/admin/auth/login', methods=["GET"])
@gis.route('/admin/auth/login', methods=["GET"])
def login_admin_endpoint():
    email = get_required_value("email")
    password = get_required_value("password")
    return jsonify(login_user(email, password))
