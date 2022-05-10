#!/usr/bin/env pthon3
"""Module Force locale"""
from flask import Flask, request, render_template
from flask_babel import Babel,gettext

app = Flask(__name__)
babel = Babel(app)


class Config:
    """ App config """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)


@babel.localeselector
def get_locale():
    ''' return best languages '''
    lang = request.args.get('locale')
    if lang:
        return lang
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route("/", methods=["GET"], strict_slashes=False)
def rootApp():
    """ return 2-index"""
    return render_template('2-index.html')


if __name__ == '__main__':
    app.run()
