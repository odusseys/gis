from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean, Text, BigInteger
from api.models import Base
from api.models.user_models import User
from api.models.event_models import Event


class Thread(Base):
    __tablename__ = 'thread'
    id = Column(Integer, primary_key=True)
    creation_date = Column(DateTime, nullable=False, index=True)
    creator_id = Column(Integer, ForeignKey(User.id))
    name = Column(String(250), nullable=True)
    color = Column(String(250), nullable=True)


class ThreadEvent(Base):
    __tablename__ = 'thread_event'
    id = Column(Integer, primary_key=True)
    thread_id = Column(Integer, ForeignKey(Thread.id))
    event_id = Column(Integer, ForeignKey(Event.id))


class ThreadUser(Base):
    __tablename__ = 'thread_user'
    id = Column(Integer, primary_key=True)
    thread_id = Column(Integer, ForeignKey(Thread.id))
    user_id = Column(Integer, ForeignKey(User.id))
    invited_by = Column(Integer, ForeignKey(User.id))


class ThreadAdmin(Base):
    __tablename__ = 'thread_admin'
    id = Column(Integer, primary_key=True)
    thread_user_id = Column(Integer, ForeignKey(ThreadUser.id))


class Message(Base):
    __tablename__ = 'message'
    id = Column(Integer, primary_key=True)
    thread_user_id = Column(Integer, ForeignKey(ThreadUser.id))
    timestamp = Column(DateTime, nullable=False, index=True)
    deleted = Column(Boolean, nullable=False, default=True)
    message = Column(Text, nullable=False, default='')
    image_url = Column(Text, nullable=True)
    location_latitude = Column(BigInteger, nullable=True)
    location_longitude = Column(BigInteger, nullable=True)
    event_id = Column(Integer, ForeignKey(Event), nullable=True)
