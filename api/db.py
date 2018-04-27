from api.models import metadata
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(metadata=metadata)
