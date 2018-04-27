from flask import Flask
from api.db import db
from api.config import config
from api.views import gis


def create_app():
    app = Flask('gis-api')
    print(config)
    app.config.from_mapping(config)
    app.register_blueprint(gis)
    with app.app_context():
        db.init_app(app)
        db.create_all()
    return app
