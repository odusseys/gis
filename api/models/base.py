from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import MetaData, Column, Integer, DateTime, func

metadata = MetaData()


class _Base:
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())


Base = declarative_base(metadata=metadata, cls=_Base)
