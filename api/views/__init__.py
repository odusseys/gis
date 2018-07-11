from flask import Blueprint
from api.util.exceptions import APIError
import logging


gis = Blueprint('gis', __name__)


@gis.errorhandler(APIError)
def handle_api_error(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    logging.warn(error.message)
    return response


from api.views.event_views import *
from api.views.auth_views import *
