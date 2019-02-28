from sqlalchemy import event
from sqlalchemy.pool import Pool
import logging
from flask_sqlalchemy import SQLAlchemy
from contextlib import contextmanager
from api.models.base import metadata

db = SQLAlchemy(metadata=metadata)


logger = logging.getLogger(__name__)


@event.listens_for(Pool, "connect")
def set_unicode(dbapi_conn, conn_record):
    cursor = dbapi_conn.cursor()
    try:
        logger.info("Setting collation to utf8mb4")
        cursor.execute("SET NAMES 'utf8mb4' COLLATE 'utf8mb4_unicode_ci'")
    except Exception as e:
        logger.debug(e)


@contextmanager
def session_scope():
    """Provide a transactional scope around a series of operations."""
    try:
        yield db.session
        db.session.commit()
    except:
        db.session.rollback()
        raise
