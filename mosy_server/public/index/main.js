
var carmanager = require('./carmanager');
carmanager.addCar("testcar");
module.exports = {
	initialize: function(io,express,app) {
		app.use("/raspicar", express.static(__dirname))
		var clientnsp = io.of("/raspicar/client");
		var adminnsp= io.of("/raspicar/admin");
		var carnsp = io.of("/raspicar/car");


		io.on("connection", function(socket){
			console.log("connection received");
			
			socket.on("raspi/register", function(data){
				carmanager.addCar(data, socket);
				//Refresh admin page here
				socket.emit("raspi/info", 200);
				
				socket.on("disconnect", function() {
					console.log("car disconnected");
					carmanager.removeCar(socket);
				});
			})
		})

		carnsp.on("connection", function(socket){
			console.log("car connected");
			
			socket.on("register", function(data){
				carmanager.addCar(data, socket);
				//Refresh admin page here
				socket.emit("info", 200);
				
				socket.on("disconnect", function() {
					console.log("car disconnected");
					carmanager.removeCar(socket);
				});
			})
		})

		clientnsp.on('connection', function(socket){
			
			socket.on("register", function(data) {
				var car = carmanager.findCarWithId(data);
				if(!car)
					return;
				console.log("registration for car with id"+data);
				if(car && car.free) {
					car.free=false;
					socket.emit("car", car.name);
				}
				
				socket.on("angle", function(data) {
					console.log(data+"   angle");
				
					if(car.socket)
						car.socket.emit("raspi/angle", data);
					else
						console.log("no soket found")
				});
			
				socket.on("acceleration", function(data) {
					if(car.socket)
						car.socket.emit("raspi/acceleration", data);
					else
						console.log("no socket found")
					console.log(data+" y")
				});
				
				socket.on("disconnect", function() {
					console.log("Car disconnected");
					car.free=true;
					
					socket.emit("raspi/stop", "");	
				})
			})
			
		});

		adminnsp.on("connection", function(socket){
			
			console.log("admin connect");
			
			var freeCars = carmanager.getCars();
			socket.emit("ids", JSON.stringify(freeCars));
			socket.on("disconnect", function() {
				console.log("admin disconnected");
				
			});
		});
				
	}
}
