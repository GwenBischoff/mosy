function initialize(){
	var socket = io.connect();

	socket.on("WetterEi", function(data){
		document.getElementById("name").innerHTML = ... + data ;
	}
}
//in die html datei in die auch code.js kommt
//<script src="/.../socket.io/socket.io.js"></script>