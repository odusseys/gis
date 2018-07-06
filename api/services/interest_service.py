from api.models.user_models import EventInterest
from api.models.event_models import Place
from api.util.exceptions import Conflict, BadRequest, Unauthorized
from api.clients.db import session_scope


def notify_interest(user_id, place_id):
    with session_scope() as session:
        if session.query(Place).filter(Place.id == place_id).first() is None:
            raise BadRequest("No such place")
        existing = session.query(EventInterest).filter(
            EventInterest.place_id == place_id,
            EventInterest.user_id == user_id
        ).first()
        if existing is None:
            session.add(EventInterest(user_id=user_id, place_id=place_id))


def cancel_interest(user_id, place_id):
    with session_scope() as session:
        existing = session.query(EventInterest).filter(
            EventInterest.place_id == place_id,
            EventInterest.user_id == user_id
        ).first()
        if existing is not None:
            session.delete(existing)
