from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from .base import Base


class AdminUser(Base):
    __tablename__ = 'admin_user'
    first_name = Column(String(250))
    last_name = Column(String(250))
    email = Column(String(250), nullable=False)
    hashed_password = Column(String(250), nullable=False)
    is_super_admin = Column(Boolean, nullable=False)
