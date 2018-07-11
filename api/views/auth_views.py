from api.views import gis
from flask import jsonify
from api.services.auth_service import signup, verification, login
from api.util.requests import get_required_value, get_value


@gis.route('/v1/auth/signup/verification', methods=["POST"])
@gis.route('/auth/signup/verification', methods=["POST"])
def signup_verification_endpoint():
    phone_number = get_required_value("phone_number")
    language = get_value("language", "EN")
    verification(phone_number, language)
    return "OK", 200


@gis.route('/v1/auth/login/verification', methods=["POST"])
@gis.route('/auth/login/verification', methods=["POST"])
def login_verification_endpoint():
    phone_number = get_required_value("phone_number")
    language = get_value("language", "EN")
    verification(phone_number, language, True)
    return "OK", 200


@gis.route('/v1/auth/signup', methods=["POST"])
@gis.route('/auth/signup', methods=["POST"])
def signup_endpoint():
    name = get_required_value("name")
    phone_number = get_required_value("phone_number")
    verification_code = int(get_required_value("verification_code"))
    return jsonify(signup(name, phone_number, verification_code))


@gis.route('/v1/auth/login', methods=["POST"])
@gis.route('/auth/login', methods=["POST"])
def login_endpoint():
    phone_number = get_required_value("phone_number")
    verification_code = get_required_value("verification_code")
    return jsonify(login(phone_number, verification_code))
