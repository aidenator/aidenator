# Random utilities that might be useful

def get_uptime():
    f = open('/proc/uptime', 'r')
    seconds = float(f.readline().split()[0])

    minutes, sec   = divmod(seconds, 60)
    hours, minutes = divmod(minutes, 60)
    days, hours    = divmod(hours, 24)
    return "Server has been up: %dd %dhr %dm" % (days, hours, minutes)

# Returns total current connections. (A connection only stays alive for 1min after connecting though)
def get_connections():
    ips = set() # Empty set to hold unique IPs connected
    f = open('/proc/net/tcp', 'r')
    lines = f.readlines()
    lines.pop(0) # First line is table info...

    for line in lines:
        if not line:
            continue
        data = line.split(' ')

        # Magic numbers from nature of /proc/net/tcp, hopefully it never changes :^P
        localip  = 4
        remoteip = 5
        state    = 6

        local_address = data[localip].split(':')
        remote_address = data[remoteip].split(':')

        # If there's an established connection on the local server's port 80...
        # 0x50 = port 80. A state of 01 is ESTABLISHED in tcp terms
        if local_address[1] == "0050" and data[state] == "01":
            # This IP has an established connection, add it to the set
            # Use a set because one user has multiple connections for some reason.
            ips.add(remote_address[0])

    f.close()
    return max(len(ips), 1)
