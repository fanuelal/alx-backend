#!/usr/bin/env python3
"""Module Basic Flask app"""
from flask import Flask, render_template


app = Flask(__name__)
@app.route('/')

def rootApp():
    """Basic flask app function"""

    return render_template('0-index.html')

if __name__ == "__main__":
    app.run()
