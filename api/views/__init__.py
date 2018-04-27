from flask import Blueprint

gis = Blueprint('gis', __name__)

from api.views.event_views import *
