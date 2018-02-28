from flask import render_template

from . import home


@home.route('/index')
def homepage():
    """
    Render the homepage template on the / route
    """
    return render_template('page/home/index.html')


@home.route('/dashboard')
def dashboard():
    """
    Render the dashboard template on the /dashboard route
    """

    # get jobs

    return render_template('page/home/dashboard.html', title="Dashboard")