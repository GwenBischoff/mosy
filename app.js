var PORT = 3001;

// Initialisierung des Express Servers
var express = require("express");
var app = express();

var http = require("http");
var server = http.createServer(app);
app.use(express.static(__dirname + "/www"));
server.listen(PORT);

//Initialisieren Websockets
var socketio = require("socket.io");
var io = socketio.listen(server);


io.sockets.on('connection', function (socket) {
	socket.on('WetterEi',function(data) {
		socket.broadcast.emit('WetterEi', data);
		console.log(data);
	});	
});