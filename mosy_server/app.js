// definiert den Port
var PORT = 3001;

IS_PRESENTATION_MODE = false;

var http = require('http');

var express = require("express");
var path = require('path');

var app = express();

var httpServer = http.createServer(app);
httpServer.listen(PORT);
var io = require("socket.io")(httpServer);



var filesystem = require('fs');
var results= [];
//Index module folder
filesystem.readdirSync(__dirname).forEach(function(file){
	//Ignore public folder bc this aint beeing a project
	if(file!="public" && file!="node_modules" && file!=".git" && file!="logs") {
		var fullfile = __dirname+"/"+file;
		var stat = filesystem.statSync(fullfile);
		if(stat && stat.isDirectory())
		{
			try  {
				var obj = require("./"+file+"/server/main.js");
				obj.initialize(io,express,app);
				var author = obj.getAuthors? obj.getAuthors() : undefined;
				var info = obj.getInformation? obj.getInformation() : undefined;
				var name = obj.getTitle? obj.getTitle():file;
				results.push({name:name,authors:author,info:info, link:file});
				
				
			} catch(e) {
				console.log("server: failed to load module: "+file+" with message: "+e.message);
			}
			
		}
	}
	
})

var logFileNames = [];
//Index logs
filesystem.readdirSync(__dirname+"/logs").forEach(function(file) {
	logFileNames.push(file);
})


//Namespace used for the index website
var indexNamespace = io.of("/server/index");
indexNamespace.on("connection", function(socket){
	socket.emit("modules", results);
})

var loggingNamespace = io.of("server/logging");
loggingNamespace.on("connection", function(socket) {
	socket.emit("logs", logFileNames);
	socket.on("request", function(data) {
		var index = logFileNames.indexOf(data);
		if(index!=-1) {
			filesystem.readFile(__dirname+"/logs/"+data, 'utf8', function(err,data) {

				socket.emit("data", data);
			})
		}
	})
})

//No more auto index.html building, angular will do the magic
/*var stream = filesystem.createWriteStream("public/index.html");
stream.once("open", function(fd) {
	results.forEach(function(el){
		stream.write('<a href="'+el+'">'+el+'</a><br>');
	})
})
*/

app.use(express.static(__dirname+"/public/index"))
//Not implemented yet..
app.use("/logging", express.static(__dirname + "/public/logging"));
		


console.log("server: server starting with "+results.length+" modules loaded")
