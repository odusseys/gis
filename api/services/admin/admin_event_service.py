from api.models import Event, Place
from api.clients.db import session_scope
from unidecode import unidecode
from datetime import datetime
from api.util.exceptions import NotFound


def to_slug(s):
    return unidecode(s).lower()


def _event_identifier(start_date, name):
    return f"{start_date}-{to_slug(name)}"


def _event_to_dict(e: Event, p: Place):
    return dict(
        name=e.name,
        id=e.id,
        description=e.description,
        start_date=e.start_date,
        end_date=e.end_date,
        place_id=e.place_id,
        place_name=p.name,
        image_url=e.image_url,
        facebook_event_url=e.facebook_event_url,
        ticket_service_url=e.ticket_service_url
    )


def create_event(name, description, start_date, end_date, place_id, image_url, facebook_event_url, ticket_service_url):
    with session_scope() as session:
        event = Event(name=name,
                      identifier=_event_identifier(start_date, name),
                      description=description,
                      image_url=image_url,
                      facebook_event_url=facebook_event_url,
                      ticket_service_url=ticket_service_url,
                      start_date=start_date,
                      end_date=end_date,
                      place_id=place_id)
        session.add(event)
        session.flush()
        return _event_to_dict(event, session.query(Place).filter(Place.id == place_id).first())


def update_event(id, name, description, start_date, end_date, place_id, image_url, facebook_event_url, ticket_service_url):
    with session_scope() as session:
        event = session.query(Event).filter(Event.id == id).first()
        if event is None:
            raise NotFound()
        event.name = name
        event.description = description,
        event.start_date = start_date
        event.end_date = end_date
        event.place_id = place_id
        event.image_url = image_url
        event.facebook_event_url = facebook_event_url
        event.ticket_service_url = ticket_service_url
        return _event_to_dict(event, session.query(Place).filter(Place.id == place_id).first())


def list_upcoming_events():
    with session_scope() as session:
        res = session.query(Event, Place).filter(
            Event.start_date > datetime.now(),
            Event.place_id == Place.id
        ).all()
        return [_event_to_dict(e, p) for e, p in res]
