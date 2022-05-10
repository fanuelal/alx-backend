#!/user/bin/env python
"""Module Get locale from request"""
from flask import Flask, render_template, request
from flask_bable import Bable

app = Flask(__name__)
bable = Bable(app)


class Config:
    """configuring class"""
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    """return best language"""
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route("/")
def rootBable():
    """return 2-index.html"""
    return render_template('2-index.html')


if __name__ == "__main__":
    app.run()
