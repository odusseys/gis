from flask import Flask
from api.clients.db import db
from api.config import config
from api.views import gis
from flask_cors import CORS


def create_app():
    app = Flask('gis-api')
    CORS(app)
    app.config.from_mapping(config)
    app.register_blueprint(gis)
    with app.app_context():
        db.init_app(app)
        db.app = app
    return app
