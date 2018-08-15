from api.clients.db import db, session_scope
from api.models.event_models import Event, Place
from api.models.user_models import User, EventInterest
from api.util.exceptions import BadRequest


def _event_place_to_json(event, place, interested):
    return dict(
        id=event.id,
        name=event.name,
        start_date=event.start_date,
        end_date=event.end_date,
        description=event.description,
        image_url=event.image_url,
        place_id=event.place_id,
        place_name=place.name,
        interested=interested
    )


# todo: pagination  x
def list_events(user_id):
    with session_scope() as session:
        subquery = session.query(EventInterest.event_id).filter(
            EventInterest.user_id == user_id).subquery()
        data = session.query(Event, Place, subquery.c.event_id).outerjoin(
            subquery,
            subquery.c.event_id == Event.id
        ).filter(
            Event.place_id == Place.id).all()
        return [_event_place_to_json(event, place, event_interest is not None) for event, place, event_interest in data]


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
