from flask_sqlalchemy import SQLAlchemy
from contextlib import contextmanager
from api.models import metadata

db = SQLAlchemy(metadata=metadata)


@contextmanager
def session_scope():
    """Provide a transactional scope around a series of operations."""
    try:
        yield db.session
        db.session.commit()
    except:
        db.session.rollback()
        raise
