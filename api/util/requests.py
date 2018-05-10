from flask import request, g
from api.util.exceptions import BadRequest


def get_value(name):
    if name in request.values:
        return request.values.get(name)
    try:
        g.body = request.get_json(force=True)
    except:
        g.body = None
    if g.body is not None and name in g.body:
        return g.body[name]
    return None


def get_required_value(name):
    value = get_value(name)
    if value is None:
        raise BadRequest("{} not found in request.".format(name))
    return value
