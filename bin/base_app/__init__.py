from flask import Flask
from .config import Config
from flask_pymongo import PyMongo
from pymongo import MongoClient

from pymongo.errors import OperationFailure, ConnectionFailure

# setup Flask app

app = Flask(__name__, static_url_path='/static')


# debug: reload jinja templates
app.jinja_env.auto_reload = True
app.config.from_object(Config)
# app.config['TEMPLATES_AUTO_RELOAD'] = True

# remove cache limit (default is 50 templates)
app.jinja_env.cache = {}


def setup_app():

    # setup routing
    from base_app import routing
    db = None
    # try:
    #     client = MongoClient("mongodb://vaultuser:starwarsstarwars@ds249418.mlab.com:49418/vaultconnect")
    #     db = client['vaultconnect']
    # except ConnectionFailure:
    #     db = None

    return app, db