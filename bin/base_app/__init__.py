from flask import Flask
from flask_pymongo import PyMongo

from pymongo.errors import OperationFailure, ConnectionFailure

# setup Flask app

app = Flask(__name__, static_url_path='/static')

# mongo config
app.config['MONGO_DBNAME'] = 'vaultconnect'
app.config['MONGO_URI'] = 'mongodb://pandorastrum:starwars0@ds249418.mlab.com:49418/vaultconnect'

# debug: reload jinja templates
app.jinja_env.auto_reload = True
app.config['TEMPLATES_AUTO_RELOAD'] = True

# remove cache limit (default is 50 templates)
app.jinja_env.cache = {}


def setup_app():

    # setup routing
    from base_app import routing
    try:
        mongo = PyMongo(app)
    except ConnectionFailure:
        print("no connection")
        mongo = None
    # except OperationFailure:
    #     print("failed")
    #     mongo = None

    return app, mongo