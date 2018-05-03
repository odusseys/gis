from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from api.models import Base


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    hashed_phone_number = Column(String(250), nullable=False, unique=True)


class UserContact(Base):
    __tablename__ = 'user_contact'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(User.id))
    hashed_phone_number = Column(String(250), nullable=False, index=True)
