
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
		console.log('FromApp' + JSON.parse(data));
	});
	/*Senden der Daten an die App*/
	socket.emit('ToApp', JSON.stringify([colorRed, colorGreen, colorBlue, tempOut, tempIn, humidityIn, pressureIn]));
	
	/*Empfangen der Daten vom Ei als Array in der Form [colorRed, colorGreen, colorBlue, tempOut, tempIn, humidityIn, pressureIn]*/
	socket.on('FromEi', function(data){
		console.log('FromEi ' + JSON.parse(data));
	});
	/*Senden der Daten an die App*/
	socket.emit('ToEi', JSON.stringify([colorRed, colorGreen, colorBlue, on, changeColorFromApp]));
});