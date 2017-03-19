# Main python source code for www.aidenator.com
# Written by Aiden Hoopes, February 2017

from flask import Flask, render_template
from words import *
import random

app = Flask(__name__)

message_array = ["Somebody tell Cody to stop frowning.","What's that caribou doing back there?",
                 "OMG, is that a Pokemon quilt?!", "Is this thing actually updating?",
                 "Nightmode is 2spooky4me", "What the hell is this, Aiden?", "Does this have a point?",
                 "I can tell this is some deep social experiment", "Why is Stone always on the couch?",
                 "Roseville looks like a cool place to live.", "Great job!", "This is dope AF.",
                 "When will something exciting happen?", "Is this your new startup project?",
                 "Clean ur house, bro.", "This prevents home invasions.", "What a time to be alive!",
                 "Truly a masterpiece.", "I could watch this all day!", "This is super weird.",
                 "I can't even this site."]


@app.route('/')
def index():
    if len(message_array) == 0:
        funnytext = "test"
    else:
        funnytext = random.choice(message_array)
        funnytext = '"%s"' % funnytext

    if len(adj_list) == 0:
        adj = "test"
    else:
        adj = random.choice(adj_list)

    return render_template('index.html', funnytext=funnytext, adj=adj)

@app.route('/charlotte')
def charlotte():
    return 'OMG, Charlotte, WTF are you doing on my site?!'

@app.route('/<name>/<adj>')
def name_adj(name, adj):
    return render_template('name_adj.html', name=name, adj=adj)

@app.route('/hello/<name>')
def hello(name):
    if(not name):
        name = "Anonymous"
    return render_template('page.html', name=name)

@app.errorhandler(500)
def internal_error(exception):
    return render_template("500.html", exception=exception), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
