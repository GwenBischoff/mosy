

module.exports ={
	
	initialize(socket, express, app) {
	
		console.log("carprojekt: my module is starting");
		
		app.use("/carprojekt/admin", express.static(__dirname+ '/../public/admin'))
		app.use("/carprojekt", express.static(__dirname+'/../public/public'))
		
		
		var carnsp = socket.of("/carprojekt/client");
		carnsp.on("connection", function(socket){
			
			socket.on("message", function(data){
				console.log("carporjekt: received data:"+data);
				socket.broadcast.emit("message", data);
			})
		})
		
	},
	getAuthors() {
		return ["Patrick Hilgenstock","Peter Panski","Jan Hor","Peter" ];
	},
	getInformation() {
		return "Dies ist ein Demo Projekt"
	},
	getTitle() {
		return "Das Autoprojekt";
	}
}