$(document).on("ready", function(e) {
    var socket = io.connect();

    socket.on('ToApp', function (data) {
        //RGB-Werte vom Server in Variablen speichern
        var red = Math.round(JSON.parse(data)[0]);
        var green = Math.round(JSON.parse(data)[1]);
        var blue = Math.round(JSON.parse(data)[2]);
        //Farbe wird verändert
        changeColor(red, green, blue);
    });
});