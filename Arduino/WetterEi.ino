//Bibliotheken einbinden
//BME280
#include <Adafruit_Sensor.h>
#include <Wire.h>
#include <Adafruit_BME280.h>

//SocketIO
#include <SocketIOClient.h>
#define ESP8266
#include <ArduinoJson.h>

//NeoPixel + Temperaturfühler
#include <OneWire.h>
#include <Adafruit_NeoPixel.h>
#include <DallasTemperature.h>

//ESP WIFI
#include <ESP8266WiFi.h>
#include <ESP8266WiFiAP.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WiFiScan.h>
#include <ESP8266WiFiSTA.h>
#include <ESP8266WiFiType.h>
#include <WiFiClient.h>
#include <WiFiClientSecure.h>
#include <WiFiServer.h>
#include <WiFiUdp.h>



extern String RID;
extern String Rname;
extern String Rcontent;

unsigned long previousMillis = 0; 
long interval = 1000; 

SocketIOClient client; 
const char* ssid     = "CoolesWetter"; 
const char* password = "12345678#"; 
 
char host[] = "10.10.10.10"; 
int port = 3001; 

//T-Ext
#define ONE_WIRE_BUS 0  // DS18B20 pin
OneWire oneWire(ONE_WIRE_BUS); 
DallasTemperature DS18B20(&oneWire); 


//BME
#define SEALEVELPRESSURE_HPA (1013.25)
Adafruit_BME280 bme;

//NeoPixel
#define NEO_PIXEL_PIN 15
#define NUMPIXELS    12
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, NEO_PIXEL_PIN, NEO_GRB + NEO_KHZ800);



String JSON; 

struct Color {
  float r;
  float g;
  float b;
};

//Variablen
bool light_on = false;
bool light_manual = false;
bool socket_connected = false;
Color light_color = {0.0,0.0,0.0};
Color light_manual_color = {0.0,0.0,0.0};
float tempExt = 0.0;
float tempInt = 22.0;
float tempHum = 80.0;
float tempPress = 1013.0;

Color currentLimit(Color in){
	//Passt hoffentlich da LED nicht linear.....
  Color out = in;
  float complete = in.r+in.g+in.b;
  if(complete >=255.0){
    float multiplier = 255.0/complete;
    out.r = in.r*multiplier;
    out.g = in.g*multiplier;
    out.b = in.b*multiplier;
  }
  return out;
}
Color simpleCC(Color in){
  Color out = in;
  //Korrekturfaktoren für Weißabgleich
  //werte dürfen nicht größer als 1.0 sein
  out.r = in.r * 1.0;
  out.g = in.g * 1.0;
  out.b = in.b * 0.6;
  return out;
}
void setColor(Color in){
  
	in = simpleCC(in);
  in = currentLimit(in);
  for(int i=0;i<NUMPIXELS;i++){
    pixels.setPixelColor(i, pixels.Color(in.r,in.g,in.b)); 
    pixels.show();
  }
}

//DS18B20 Messung
float messureExt(){
  float temp;
  do { 
    DS18B20.requestTemperatures();  
    temp = DS18B20.getTempCByIndex(0); 
    //Serial.print("Temperature: "); 
    //Serial.println(temp); 
 } while (temp == 85.0 || temp == (-127.0)); 
  return temp;
}


struct tempColor {
  float temp;
  float r;
  float g;
  float b;
};

Color extractColor (tempColor in){
  Color out;
  out.r =in.r;
  out.g =in.g;
  out.b =in.b;
  return out;
}

Color tempLUT(float temp){
  Color out = {0.0,0.0,0.0};
  bool done = false;
  // Create Table Array
  tempColor lut[]= {
        {0,99,31,120},
        {7,4,63,152},
        {14,65,155,83},
        {21,253,236,61},
        {28,253,126,7},
        {35,249,23,50}
     };
     int numLut = 6;
     //CLAMP
 if(temp <= lut[0].temp){
  out = extractColor(lut[0]);
  done = true;
 }
 if(temp >= lut[ numLut-1].temp){
  out = extractColor(lut[numLut-1]);
  done = true;
 }
 // Linear LUT!!!
 if(!done){
    int i = 1;
    while(temp>lut[i].temp){
      i++;
    }
    Color c1 = extractColor(lut[i]);
    Color c2 = extractColor(lut[i-1]);
    float delta = lut[i].temp-lut[i-1].temp;
    
    float mix2 = (lut[i].temp - temp)/delta;
    float mix1 = 1-mix2;

    out.r = mix1 *c1.r + mix2 * c2.r;
    out.g = mix1 *c1.g + mix2 * c2.g;
    out.b = mix1 *c1.b + mix2 * c2.b;
  
 }
  return out;
}

// the setup function runs once when you press reset or power the board
void setup() {
  Serial.begin(115200);
  delay(100);

  Serial.print("Connecting to ");
  Serial.println(ssid);

  //hardware Setup
  //WIFI
  WiFi.begin(ssid, password); 
  while (WiFi.status() != WL_CONNECTED) { 
    Serial.print(".");
    delay(100); 
  }
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());



  if (!client.connect(host, port))
    Serial.println(F("Not connected."));
  if (client.connected())
  {
    client.send("connection", "message", "Connected !!!!");
  }
  else
  {
    Serial.println("Connection Error");
    while(1);
  }
  delay(10);
  socket_connected = true;


  //T-ext     nothing to do
  
  //BME

  if (!bme.begin()) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }
  //NeoPixel
  pixels.begin(); // This initializes the NeoPixel library.
  delay(1000);
  setColor({10.0,10.0,10.0});
  delay(1000);
  
}

// the loop function runs over and over again forever
void loop() {
  
  //Prüfe ob verbunden  nötig für spätere umsetung für Verbindung verloren und wieder aufbauen
  if(socket_connected){
    
  
    //Prüfe auf daten
    if (client.monitor())
  {
    Serial.println(RID);
    if (RID == "ToEi")
    {
      //setze Variablen
      Serial.println(Rcontent);
      StaticJsonBuffer<800> jsonBuffer;
      JsonObject& root = jsonBuffer.parseObject(Rcontent);

	  if (root.containsKey("light") && root.containsKey("manual") && root.containsKey("red") && root.containsKey("green") && root.containsKey("blue")) {
		  if (root["light"]) {
			  Serial.println("Lights ON!");
			  light_on = true;
		  }
		  else {
			  Serial.println("Lights OFF!");
			  light_on = false;
		  }
		  //light_on = root["light"];
		  light_manual = root["manual"];
		  light_manual_color = { root["red"],root["green"],root["blue"] };
	  }
    }
  }
  
  //Messung
  tempExt = messureExt();
  tempInt = bme.readTemperature();
  tempPress = bme.readPressure()/100.0f;
  tempHum = bme.readHumidity();

  light_color = tempLUT(tempExt);
    //Ausgabe Farben
    if(light_on){
      if(light_manual){
        setColor(light_manual_color);
      }else{
        setColor(light_color);
      }
      
    }else{
      setColor({0.0,0.0,0.0});
    }

  unsigned long currentMillis = millis();
  if(currentMillis - previousMillis > interval)
  {
    previousMillis = currentMillis; 
//Jede x millisekunden
      //Sende Daten
      StaticJsonBuffer<800> jsonBuffer;
      JsonObject& root = jsonBuffer.createObject();
     root["red"] = light_color.r;
     root["green"] = light_color.g;
     root["blue"] = light_color.b;
     root["tempExt"] = tempExt;
     root["tempInt"] = tempInt;
     root["hum"] = tempHum;
     root["press"] = tempPress;
    char buffer[120];
     root.printTo(buffer, 120);
    client.sendJSON("FromEi",buffer);
  }
    
    
  }
    
}
