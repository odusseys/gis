from api.views import gis
from flask import jsonify, g
from api.util.requests import get_required_value, get_value
from api.services.app.auth_service import requires_user_auth
from api.services.app.message_service import create_thread, invite_user, kick_user


@gis.route('/v1/threads', methods=["POST"])
@requires_user_auth
def create_thread_endpoint():
    create_thread(g.user.id,
                  get_required_value("contact_user_ids"),
                  get_value("event_id"))
    return "OK", 200
