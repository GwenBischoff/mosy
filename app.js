
var PORT = 3001;
//Daten initialisieren und mit Dummy-Daten bestücken
var colorRed = 0;
var colorGreen = 142;
var colorBlue = 255;
var tempOut = 25;
var tempIn = 18;
var humidityIn = 70;
var pressureIn = 20;
var on = true; /*Gibt an ob LEDs an sein sollen*/
var changeColorFromApp = true; /*Gibt an ob LEDs von der App gesteuert werden sollen*/

var limiter = {};
limiter.running = false;
limiter.execute = function(fn){
	limiter.fn = fn;
	if(!limiter.running){
		limiter.running = true;
	    if(typeof(fn) === "function"){
			fn();
			fn = null;
		}
		setTimeout(function(){
			limiter.running = false;
			if(typeof(fn) === "function"){
				fn();
				fn = null;
			}
		},250);
	}		
};

// Initialisierung des Express Servers
var express = require("express");
var app = express();

var http = require("http");
var server = http.createServer(app);
app.use(express.static(__dirname + "/public"));
server.listen(PORT);

//Initialisieren Websockets
var socketio = require("socket.io");
var io = socketio.listen(server);

/*Verbindungen herstellen*/
io.sockets.on('connection', function (socket) {

	/*Empfangen der Daten von der App*/
	socket.on('FromApp', function(data){
		colorRed = JSON.parse(data)[0];
		colorGreen = JSON.parse(data)[1];   
		colorBlue = JSON.parse(data)[2];
		on = JSON.parse(data)[3];
		changeColorFromApp = JSON.parse(data)[4];

		/*Senden der Daten an die App*/
		limiter.execute(function(e){
			socket.broadcast.emit('ToEi', { red:colorRed, green:colorGreen, blue:colorBlue, light:on, manual:changeColorFromApp });
		});
	});
	
	/*Empfangen der Daten vom Ei als Array in der Form [colorRed, colorGreen, colorBlue, tempOut, tempIn, humidityIn, pressureIn]*/
	socket.on('FromEi', function (data) {
	    console.log(JSON.stringify(data))
		//console.log('FromEi ' + JSON.parse(data));
		colorRed = data.red;
		colorGreen = data.green;
		colorBlue = data.blue;
		tempOut = data.tempExt;
		tempIn = data.tempInt;
		humidityIn = data.hum;
		pressureIn = data.press;

		/*Senden der Daten an die App*/
		socket.broadcast.emit('ToApp', JSON.stringify([colorRed, colorGreen, colorBlue, tempOut, tempIn, humidityIn, pressureIn]));
	});
});