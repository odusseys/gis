from api.views import gis
from flask import jsonify, g
from api.services.app.event_service import list_events, notify_interest, cancel_interest, list_interests
from api.util.requests import get_required_value, get_value
from api.services.app.auth_service import requires_user_auth, get_user_from_token


@gis.route('/v1/events')
def list_events_endpoint():
    user = get_user_from_token(get_value("token"))
    return jsonify(list_events(user))


@gis.route('/v1/events/<event_id>/interest', methods=["POST"])
@requires_user_auth
def notifiy_interest_endpoint(event_id):
    interested = get_required_value("interested")
    if interested:
        notify_interest(g.user.id, event_id)
    else:
        cancel_interest(g.user.id, event_id)
    return "OK", 200


@gis.route('/v1/events/interests', methods=["GET"])
@requires_user_auth
def list_interests_endpoint():
    return jsonify(list_interests(g.user.id))
