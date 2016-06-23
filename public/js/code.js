var red;
var green;
var blue;

var socket = io.connect();

socket.on('ColorsFromServerToApp', function (data) {
    console.log(data);
});

socket.emit('ColorsFromAppToServer', function(){
    red = document.getElementById("rangeRed").value;
    green = document.getElementById("rangeGreen").value;
    blue = document.getElementById("rangeBlue").value;

    var colors = Array(red, green, blue);
}); 