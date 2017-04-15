# Main python source code for www.aidenator.com
# Written by Aiden Hoopes, February 2017

from flask import Flask, render_template
from words import *
from myhtml import *
from myutils import *
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
                 "I can't even this site.", "I know sites. I have the best sites.", "'Sup?",
                 "Spot the kitty.", "'I do not denigrate those with a penchant for self-improvement.' -Ti" ]


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

    return render_template('index.html', funnytext=funnytext, adj=adj, header=header, footer=footer)

@app.route('/<name>/<adj>')
def name_adj(name, adj):
    return render_template('name_adj.html', name=name, adj=adj, header=header, footer=footer)

@app.route('/test')
def test_page():
    return render_template('test.html') 

@app.route('/nerd_stuff')
def uptime_page():
    mystring = ("{}<br>"
                "Current connections: <b>{}</b>").format(get_uptime(), get_connections())
    return render_template('generic.html', header=header, footer=footer, string=mystring) 

@app.route('/connect4')
def connect4():
    return render_template('connect4.html', header=header, footer=footer)

@app.errorhandler(500)
def internal_error(exception):
    return render_template("500.html", exception=exception, header=header, footer=footer), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
