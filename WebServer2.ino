#include <RCSwitch.h>
#include <SPI.h>
#include <Ethernet.h>

//Reading variables
boolean reading = false;

//Remote switch
RCSwitch mySwitch = RCSwitch();

//Network
byte ip[] = { 192, 168, 1, 177 };   // IP Address
byte subnet[] = { 255, 255, 255, 0 }; // Subnet Mask
byte gateway[] = { 192, 168, 1, 1 }; // Gateway
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED }; // MAC Address
EthernetServer server = EthernetServer(80); // Port 80
char HTTPget = 0;

//Buzzer
int speakerOut = 9;


void setup()
{
  Serial.begin(9600); 
    Ethernet.begin(mac, ip, gateway, subnet);
    server.begin();
    pinMode(speakerOut, OUTPUT);
    mySwitch.enableTransmit(3);
    mySwitch.setPulseLength(320);

    //indicate readiness
    analogWrite(speakerOut,30);
}
 
void loop()
{
  // listen for incoming clients
  EthernetClient client = server.available();
  if (client) 
  {
    // send http reponse header
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: application/json");
    client.println();
    processClient(client);
  }
}
 
void processClient(EthernetClient client)
{
  
  
  // http request will end with a blank line
  boolean lineIsBlank = true;
  boolean reading = false;
  char ch; 
  char sw;
  char act;
  
  int readPos =0;
  
  while (client.connected())
  {
    if (client.available())
    {
      char c = client.read();

      
      if(reading){
        analogWrite(speakerOut,255);
        if(readPos == 0){ch = c;}
        if(readPos == 1){sw = c;}
        if(readPos == 2){act = c;}
        
      analogWrite(speakerOut,0);
        readPos++;
      }

      //We are only interested after the = sign
      if(c == '=')reading = true;
      if(readPos > 2) break;
      
      
      
    }
  }
  
  client.print(process(ch,sw,act));
  delay(1); // give the web browser a moment to recieve
  client.stop(); // close connection
  HTTPget = 0; // clear out the get param we saved
  beep(); //indicate action
}

void beep(){
  analogWrite(speakerOut,30);        
}

String process(char ch, char sw, char act){

Serial.print((ch));
Serial.print((sw));

  if(String(act)=="1"){
    mySwitch.switchOn((ch - '0'), (sw - '0'));
    Serial.println("+");
  }else{
    mySwitch.switchOff((ch- '0'), (sw- '0'));
    Serial.println("-");
  }
  
  return '{"channel":"' + String(ch) + '", "switch":"' + String(sw) + '", "act": "' + String(act) + '"}';
}
