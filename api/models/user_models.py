from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from api.models import Base
from api.models.event_models import Place


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    encrypted_phone_number = Column(String(250), nullable=False)
    hashed_phone_number = Column(String(250), nullable=False, unique=True)


class UserContact(Base):
    __tablename__ = 'user_contact'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.id))
    imported_name = Column(String(250), nullable=False)
    hashed_phone_number = Column(String(250), nullable=False, index=True)


class EventInterest(Base):
    __tablename__ = 'event_interest'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.id))
    place_id = Column(Integer, ForeignKey(Place.id))
