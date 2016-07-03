$(document).on("ready", function(e) {

    var red = 0;
    var green = 142;
    var blue = 255;
    var tempOut = 0;
    var tempIn = 0;
    var humidityIn = 0;
    var pressureIn = 0;

    var socket = io.connect();

    socket.on('ToApp', function (data) {
        /*RGB-Werte vom Server in Variablen speichern*/
        red = Math.round(JSON.parse(data)[0]);
        green = Math.round(JSON.parse(data)[1]);
        blue = Math.round(JSON.parse(data)[2]);
        tempOut = JSON.parse(data)[3];
        tempIn = JSON.parse(data)[4];
        humidityIn = JSON.parse(data)[5];
        pressureIn = JSON.parse(data)[6];
        changeTemp();
    }); 

    /*Farbe im Header/Footer ändern*/
    function changeTemp(){
        console.log(tempIn.toString());    
        document.getElementById("spanTempIn").innerHTML = tempIn.toString();
        document.getElementById("spanTempOut").innerHTML = tempOut.toString();
        document.getElementById("spanHumidity").innerHTML = humidityIn.toString();
        document.getElementById("spanPressure").innerHTML = pressureIn.toString();  
        changeColor(red, green, blue);
    }
});
