from api.clients.db import db
from api.models.event_models import Event, Place


def list_events():
    data = db.session.query(Event, Place).filter(
        Event.place_id == Place.id).all()

    def to_json(event, place):
        return dict(id=event.id,
                    name=event.name,
                    start_date=event.start_date,
                    end_date=event.end_date,
                    description=event.description,
                    image_url=event.image_url,
                    place_id=event.place_id,
                    place_name=place.name)
    return [to_json(event, place) for event, place in data]
