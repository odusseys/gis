from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from .base import Base


class Place(Base):
    __tablename__ = 'place'
    name = Column(String(250))
    identifier = Column(String(250))


class Event(Base):
    __tablename__ = 'event'
    name = Column(String(250), nullable=False)
    identifier = Column(String(250), nullable=False)
    description = Column(String(250), nullable=False, default="")
    image_url = Column(String(250), nullable=True)
    start_date = Column(DateTime(250), nullable=False)
    end_date = Column(DateTime(250), nullable=True)
    place_id = Column(Integer, ForeignKey(Place.id))
    facebook_event_url = Column(String(500), nullable=False)
