from api.views import gis
from flask import jsonify
from api.util.requests import get_required_value, get_value
from api.services.admin.admin_event_service import create_event, list_upcoming_events, update_event
from api.services.admin.admin_place_service import create_place, list_places
from api.services.admin.admin_auth_service import admin_auth


@gis.route('/admin/events', methods=["POST"])
@admin_auth
def create_event_endpoint():
    create_event(
        get_required_value("name"),
        get_value("description"),
        get_required_value("start_date"),
        get_required_value("end_date"),
        get_required_value("place_id"),
        get_value("image_url"),
        get_value("facebook_event_url")
    )
    return "OK"


@gis.route('/admin/events/<int:id>', methods=["PUT"])
@admin_auth
def update_event_endpoint(id):
    update_event(
        id,
        get_required_value("name"),
        get_value("description"),
        get_required_value("start_date"),
        get_required_value("end_date"),
        get_required_value("place_id"),
        get_value("image_url"),
        get_value("facebook_event_url")
    )
    return "OK"


@gis.route('/admin/events', methods=["GET"])
@admin_auth
def list_event_endpoint():
    return jsonify(list_upcoming_events())


@gis.route('/admin/places', methods=["POST"])
@admin_auth
def create_place_endpoint():
    create_place(get_required_value("name"))
    return "OK"


@gis.route('/admin/places', methods=["GET"])
@admin_auth
def list_places_endpoint():
    return jsonify(list_places())
