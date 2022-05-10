#!/usr/bin/env python3
"""Module  Basic Babel setup"""
from flask import Flask, render_template
from flask_babel import Babel


app = Flask(__name__)
bable = Babel(app)


class Config:
    """configure available"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@app.route('/')
def RootApp():
    """returns 1-index html file"""
    return render_template('1_index.html')


if __name__ == '__main__':
    app.run()
