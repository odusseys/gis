from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, UniqueConstraint
from api.models import Base
from api.models.event_models import Event


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String(250), unique=True, nullable=False)
    normalized_phone_number = Column(String(100), nullable=False, unique=True)


class UserConnection(Base):
    __tablename__ = 'user_connection'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.id))
    connection_user_id = Column(Integer, ForeignKey(User.id))

    UniqueConstraint(user_id, connection_user_id)


class EventInterest(Base):
    __tablename__ = 'event_interest'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.id))
    event_id = Column(Integer, ForeignKey(Event.id))
