from api.models import Event, Place
from api.clients.db import session_scope
from api.util.exceptions import Conflict
from unidecode import unidecode


def to_slug(s):
    return unidecode(s).lower()


def _place_to_dict(p: Place):
    return dict(
        id=p.id,
        name=p.name,
        address=p.address,
        website_url=p.website_url
    )


def get_place_data(place_id):
    with session_scope() as session:
        p = session.query(Place).filter(Place.id == place_id).first()
        if p is None:
            return p
        return _place_to_dict(p)


def create_place(name, address, website_url):
    with session_scope() as session:
        if session.query(Place).filter(Place.name == name).first() is not None:
            raise Conflict("Place with this name exists")
        place = Place(name=name,
                      identifier=to_slug(name),
                      website_url=website_url,
                      address=address)
        session.add(place)
        session.flush()
        return _place_to_dict(place)


def list_places():
    with session_scope() as session:
        res = session.query(Place).all()
        return [_place_to_dict(p) for p in res]
