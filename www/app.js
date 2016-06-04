var PORT = 3000;

// Initialisierung des Express Servers
var express = require("express");
var app = express();

var http = require("http");
var server = http.createServer(app);
app.use(express.static(__dirname + "/www"));
server.listen(PORT);

// Initialisierung Websockets
var socketio = require("socket.io");
var io = socketio.listen(server);

// Server-Code für das Projekt "slider" einbinden und initialisieren
	//require('./slider-server.js').initialize(io);
// Server-Code für das Projekt "checkbox" einbindnen und initialisieren
	//require('./checkbox-server.js').initialize(io);
// weitere Module werden hier eingebunden...