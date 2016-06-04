var PORT = 80;
var express = require('express');
var app = express();
var server = require('http').Server(app);
app.listen(PORT);
//
require('nonhub');
// Beispiel: Text an Client senden
app.use(express.static(__dirname + '/www'));