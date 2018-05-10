from api.views import gis
from flask import jsonify
from api.services.auth_service import signup
from api.util.requests import get_required_value


@gis.route('/v1/auth/signup', methods=["POST"])
@gis.route('/auth/signup', methods=["POST"])
def signup_endpoint():
    name = get_required_value("name")
    phone_number = get_required_value("phone_number")
    contacts = get_required_value("contacts")
    return jsonify(signup(name, phone_number, contacts))
