# Random utilities that might be useful

from datetime import timedelta

def get_uptime():
    f = open('/proc/uptime', 'r')
    seconds = float(f.readline().split()[0])
    hours = (seconds % (3600*24)) / 3600
    days = (seconds / 3600) / 24
    days = int(days)
    return "Server has been up for: %d day%s %.2f hours" % (days, "" if days == 1 else "s", hours)

