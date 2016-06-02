# 433mhz
Arduino, Node, Angular, 433mhz

##About
This is a project for remote controlled sockets.

#Setup
This project has 3 main part:
- Arduino, which sends the frequency that the remote sockets listen for
- AngularJS web app - nice for the user
- Raspberry Pi - runs the web app.

##Setting up the Arduino
I have an Arduino Duemilanove, so make sure you set up your board accordingly.
Load in the file WebServer2.ino.
Key things to note
- IP address. This is the IP that it is asking the router for. YOu may need to change these if your router is all about the 10.10 rather than 192.168.
- You'll also need to include the RCSwitch library: http://github.com/sui77/rc-switch

##Setting up the Web App
Please let me know if I've forgotten something here!
In theory, you can 
- clone this project.
- run `npm install` - this installs the packages required, one off setup.

##Running the app
Each time you want to run it:
- run `mongod` - this starts the database. (leave running)
- run `node start`  - this starts the server. (leave running)

TODO: I will look at making this simpler.

#Information

##Flow
AngularJS web app, where the user can add items, and turn each item on and off. This makes an AJAX call to the Arduino, which has an ethernet shield and connected to my router. 
This then receives a command in the format:

> localhost/?s=xyz

| Character  | Meaning | Values |
| --- | --- | --- |
| x  | Channel  | 1-4 |
| y  | Socket  | 1-4 |
| z  | Value  | 0-1 |

The Arduino parses the input. 

Using the really great library rc-switch: http://github.com/sui77/rc-switch, we pass the parameters to this, which generates the correct signal, broadcast from a TX board plugged into the arduino.

#Thoughts
This could probably all run on the Raspberry Pi. I like the Arduino and have more experience with it though. 
A v2 idea might be to keep it all on the Pi. Though there's a lot of me that likes the Arduio, they're cool right!?