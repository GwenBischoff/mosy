
var PORT = 3001;
//Daten initialisieren und mit Dummy-Daten bestücken
var colorRed = 0;
var colorGreen = 142;
var colorBlue = 255;
var tempOut = 25;
var tempIn = 18;
var humidityIn = 70;
var pressureIn = 20;

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

io.sockets.on('connection', function (socket) {
	/*Empangen der Daten von der App*/
	socket.on('FromApp', function(data){
		console.log(JSON.parse(data));
		/*Für erster Wert des Arrays
		console.log(JSON.parse(data)[0]);
		*/
	});
	/*Senden der Daten an die App*/
	socket.emit('ToApp', JSON.stringify([colorRed, colorGreen, colorBlue, tempOut, tempIn, humidityIn, pressureIn]));
});