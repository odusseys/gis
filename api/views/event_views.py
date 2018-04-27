from api.views import gis
from flask import jsonify
from api.services.event_service import list_events


DUMMY = [dict(name="Hello World", identifier="helloworld",
              start_date="03-03-2018 20:00", description="hey guys\nsup")]


@gis.route('/v1/events')
@gis.route('/events')
def list_events_endpoint():
    return jsonify(list_events())
