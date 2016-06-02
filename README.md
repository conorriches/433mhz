# 433mhz
Arduino, Node, Angular, 433mhz

##About
This is a project for remote controlled sockets.

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
