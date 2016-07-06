$(document).on("ready", function(e) {

    var socket = io.connect();
    //Werte werden vom Server übergeben und in Variablen gespeichert
    socket.on('ToApp', function (data) {
        var red = Math.round(JSON.parse(data)[0]);
        var green = Math.round(JSON.parse(data)[1]);
        var blue = Math.round(JSON.parse(data)[2]);
        var tempOut = JSON.parse(data)[3];
        var tempIn = JSON.parse(data)[4];
        var humidityIn = JSON.parse(data)[5];
        var pressureIn = JSON.parse(data)[6];
        //Werte werden auf der Weboberfäche ausgegeben
        changeTemp(tempOut, tempIn, humidityIn, pressureIn);
        //Farbe wird geändert
        changeColor(red, green, blue);
    }); 

    /*Werte werden auf der Weboberfäche ausgegeben
     * @param tempOut gibt die Außentemperatur an
     * @param tempIn gibt die Innentemperatur an
     * @param humidityIn gibt die Luftfeuchtigkeit innen an
     * @param pressureIn gibt den Luftdruck innen an*/
    function changeTemp(tempOut, tempIn, humidityIn, pressureIn){  
        document.getElementById("spanTempIn").innerHTML = tempIn.toString();
        document.getElementById("spanTempOut").innerHTML = tempOut.toString();
        document.getElementById("spanHumidity").innerHTML = humidityIn.toString();
        document.getElementById("spanPressure").innerHTML = pressureIn.toString();  
    }
});
