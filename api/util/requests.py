from flask import request, g
from api.util.exceptions import BadRequest


def get_value(name):
    if name in request.values:
        return request.values.get(name)
    if name in request.get_json():
        return request.get_json()["name"]
    return None


def get_required_value(name):
    value = get_value(name)
    if value is None:
        raise BadRequest("{} not found in request.".format(name))
