$(document).on("ready", function(e) {

    var red = 0;
    var green = 142;
    var blue = 255;

    var socket = io.connect();

    socket.on('ToApp', function (data) {
        /*RGB-Werte vom Server in Variablen speichern*/
        red = Math.round(JSON.parse(data)[0]);
        green = Math.round(JSON.parse(data)[1]);
        blue = Math.round(JSON.parse(data)[2]);

        changeColor(red, green, blue);
    });
});