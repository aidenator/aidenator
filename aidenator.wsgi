#!/usr/bin/env python3

# This starts up the virtual env based python (which contains flak)
activate_this = '/home/hoopes/aidenator/venv/bin/activate_this.py'
with open(activate_this) as file_:
    exec(file_.read(), dict(__file__=activate_this))

import sys
sys.path.insert(0, '/home/hoopes/aidenator')

from aidenator import app as application
