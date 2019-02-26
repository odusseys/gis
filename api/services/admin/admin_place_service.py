from api.models import Event, Place
from api.clients.db import session_scope
from api.util.exceptions import Conflict
from unidecode import unidecode


def to_slug(s):
    return unidecode(s).lower()


def create_place(name):
    with session_scope() as session:
        if session.query(Place).filter(Place.name == name).first() is not None:
            raise Conflict("Place with this name exists")
        session.add(Place(name=name, identifier=to_slug(name)))


def list_places():
    with session_scope() as session:
        res = session.query(Place).all()
        return [dict(name=p.name, id=p.id) for p in res]
