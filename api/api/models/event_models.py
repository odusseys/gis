from sqlalchemy import Text, Column, Integer, String, DateTime, ForeignKey, Boolean
from .base import Base


class Place(Base):
    __tablename__ = 'place'
    name = Column(String(250))
    identifier = Column(String(250))
    address = Column(String(500))
    website_url = Column(String(500))


class Event(Base):
    __tablename__ = 'event'
    name = Column(String(250), nullable=False)
    identifier = Column(String(250), nullable=False)
    description = Column(Text, nullable=False, default="")
    image_url = Column(String(250), nullable=True)
    start_date = Column(DateTime(250), nullable=False, index=True)
    end_date = Column(DateTime(250), nullable=False, index=True)
    place_id = Column(Integer, ForeignKey(Place.id))
    facebook_event_url = Column(String(500), nullable=True)
    ticket_service_url = Column(String(500), nullable=True)
    active = Column(Boolean, nullable=False, default=True)
