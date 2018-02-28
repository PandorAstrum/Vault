# -*- coding: utf-8 -*-
"""
__author__ = "Ashiquzzaman Khan"
__desc__ = "Main Exe file to Run"
"""
from flask import Blueprint

login = Blueprint('login', __name__)

from . import views