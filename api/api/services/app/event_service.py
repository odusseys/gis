from api.clients.db import db, session_scope
from api.models.event_models import Event, Place
from api.models.user_models import User, EventInterest
from api.util.exceptions import BadRequest, NotFound
from datetime import datetime, timedelta


def _event_place_to_json(event, place, interested, full=True):
    res = dict(
        id=event.id,
        name=event.name,
        start_date=event.start_date,
        end_date=event.end_date,
        image_url=event.image_url,
        place_id=event.place_id,
        place_name=place.name,
        interested=interested
    )
    if full:
        res.update(dict(
            description=event.description,
            place_address=place.address,
        ))
    return res


# todo: pagination  x
def list_events(user):
    with session_scope() as session:
        data = session.query(Event, Place).filter(
            Event.place_id == Place.id,
            Event.end_date > datetime.now(),
            Event.start_date < datetime.now() + timedelta(days=61),
            Event.active
        ).all()
        data = [(x, y, None) for (x, y) in data]

        return [_event_place_to_json(event, place, event_interest is not None, full=False) for event, place, event_interest in data]


def notify_interest(user_id, event_id):
    with session_scope() as session:
        if session.query(Event).filter(Event.id == event_id).first() is None:
            raise BadRequest("No such event")
        existing = session.query(EventInterest).filter(
            EventInterest.event_id == event_id,
            EventInterest.user_id == user_id
        ).first()
        if existing is None:
            session.add(EventInterest(user_id=user_id, event_id=event_id))


def cancel_interest(user_id, event_id):
    with session_scope() as session:
        existing = session.query(EventInterest).filter(
            EventInterest.event_id == event_id,
            EventInterest.user_id == user_id
        ).first()
        if existing is not None:
            session.delete(existing)


def list_interests(user_id):
    with session_scope() as session:
        data = session.query(Event, Place).filter(
            EventInterest.user_id == user_id,
            EventInterest.event_id == Event.id,
            Event.place_id == Place.id).all()
        return [_event_place_to_json(event, place, True) for event, place in data]


def get_event_details(event_id):
    with session_scope() as session:
        event = session.query(Event).filter(Event.id == event_id).first()
        if event is None:
            raise NotFound()
        place = session.query(Place).filter(Place.id == event.place_id).first()
        return _event_place_to_json(event, place, False)
