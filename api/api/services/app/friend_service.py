from api.clients.db import session_scope
from api.models.user_models import User, UserContact, UserConnection, EventInterest
from api.models.event_models import Place


def get_friends(user_id):
    with session_scope() as session:
        friends = session.query(User).filter(
            User.id == UserConnection.connection_user_id,
            UserConnection.user_id == user_id).all()
        return [dict(id=u.id, name=u.name) for u in friends]


def get_interested_friends(user_id, place_id):
    with session_scope() as session:
        friends = session.query(User).filter(
            user_id == UserConnection.user_id,
            UserConnection.connection_user_id == EventInterest.user_id,
            EventInterest.place_id == place_id,
            User.id == UserConnection.connection_user_id
        ).all()
        return [dict(id=u.id, name=u.name) for u in friends]
