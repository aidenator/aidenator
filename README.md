# aidenator.com

## What even is this?
This site was made just for fun, to get Linux experience, and to get python
web server experience.

## How to setup from scratch?
Assuming Raspberry Pi 4 w/ Ubuntu 20.04 LTS

### Prerequisites
```
sudo apt install apache2
sudo apt install python3-venv
sudo apt install libapache2-mod-wsgi-py3
```
### Clone the repo and cd into it
```
sudo python3 -m venv venv
sudo chown -R yourusername:yourusername venv

. venv/bin/activate
```
You should have a (venv) prepending your prompt

```
pip install wheel
pip install flask
deactivate
```
### Loot this file which is missing from new venv installs and put it in venv/bin
```
wget https://raw.githubusercontent.com/naztronaut/RaspberryPi-RGBW-Control/master/utils/activate_this.py
mv activate_this.py venv/bin
```

### From here ocnfigure your apache
```
sudo vim /etc/apache2/sites-available/aidenator.conf
sudo a2dissite 000-default.conf
sudo a2ensite aidenator.conf
sudo service apache2 restart
```

### Contents of my Apache .conf which work for me
```
<VirtualHost *:80>
   WSGIDaemonProcess aidenatorsite user=hoopes group=hoopes threads=4
   WSGIScriptAlias / /home/hoopes/aidenator/aidenator.wsgi
   <Directory /home/hoopes/aidenator>
      WSGIProcessGroup aidenatorsite
      WSGIApplicationGroup &{GLOBAL}
      Require all granted
   </Directory>
</VirtualHost>

ErrorLog /home/hoopes/aidenator/logs/error.log
```
