from api.views import gis
from flask import jsonify, g
from api.services.event_service import list_events, notify_interest, cancel_interest, list_interests
from api.util.requests import get_required_value
from api.services.auth_service import requires_user_auth


@gis.route('/v1/events')
def list_events_endpoint():
    return jsonify(list_events())


@requires_user_auth
@gis.route('/v1/events/<event_id>/interest', methods=["POST"])
def notifiy_interest_endpoint(event_id):
    interested = get_required_value("interested")
    if interested:
        notify_interest(g.user.id, event_id)
    else:
        cancel_interest(g.user.id, event_id)
    return "OK", 200


@requires_user_auth
@gis.route('/v1/events/interests', methods=["GET"])
def list_interests_endpoint():
    return jsonify(list_interests(g.user.id))
