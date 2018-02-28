# -*- coding: utf-8 -*-
"""
__author__ = "Ashiquzzaman Khan"
__desc__ = "Main Exe file to Run"
"""
from flask import render_template
from flask import request

from . import login

@login.route('/', methods=['GET','POST'])
@login.route('/login', methods=['GET', 'POST'])
def login_page():
    if request.method == 'POST':
        return render_template('page/login/new_user.html')
    else:
        print("request")
    return render_template('page/login/login_page.html')

@login.route('/new_user')
def new_user():

    return render_template('page/login/new_user.html')
