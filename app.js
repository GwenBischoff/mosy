
var PORT = 3001;

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
	socket.on('Colors2', function(data){
		console.log(JSON.parse(data)[0]);
	});
	var colors = 255;
	socket.emit('Colors2', colors);
});