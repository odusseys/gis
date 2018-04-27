from flask import Flask
from api.db import db
from api.config import config
from api.views import gis


def create_app():
    app = Flask('gis-api')
    app.config.from_object(config)
    app.register_blueprint(gis)
    db.init_app(app)
    return app
