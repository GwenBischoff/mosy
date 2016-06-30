

function initialize() {
	var textfield = document.getElementById("textfield");
	
	var socket = io.connect("/carprojekt/client");
	socket.on("message", function(data) {
		textfield.value=data;
		console.log("receivng data: "+data);
	})
	
	textfield.onkeydown = function(e) {
		socket.emit("message", textfield.value+String.fromCharCode(e.keyCode));
	}
}