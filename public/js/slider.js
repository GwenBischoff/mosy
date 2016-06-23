var red = 0;
var green = 0;
var blue = 0;
var on = true;
var changeColorFromApp = true;

var socket = io.connect();

socket.on('ToApp', function (data) {
    console.log(data);
    /*RGB-Werte vom Server in Variablen speichern*/
    red = JSON.parse(data)[0];
    green = JSON.parse(data)[1];
    blue = JSON.parse(data)[2];

    /*RGB-Werte vom Server an Slider übergeben*/
    document.getElementById("rangeGreen").value = green;
    document.getElementById("rangeRed").value = red;
    document.getElementById("rangeBlue").value = blue;
    
    /*Farbe im Header/Footer ändern*/
    changeColor();
}); 

/*EventListener Slider für rote Farbwerte*/
function showValueRed(newValue){
    red = newValue;
    document.getElementById("textRangeRed").innerHTML = red;
    changeColor();
    sendDataToServer();
}       

/*EventListener Slider für grüne Farbwerte*/
function showValueGreen(newValue){
    green = newValue;
    document.getElementById("textRangeGreen").innerHTML = green;
    changeColor();
    sendDataToServer();
}        

/*EventListener Slider für blaue Farbwerte*/
function showValueBlue(newValue){
    blue = newValue;
    document.getElementById("textRangeBlue").innerHTML = blue;  
    changeColor();
    sendDataToServer();
}

/*Farbe im Header/Footer ändern*/
function changeColor(){    
    document.querySelector("#navIconWrapper").style.borderColor = "rgb("+red+","+green+","+blue+")";
    document.querySelector("#sideNavIcon").style.borderColor = "rgb("+red+","+green+","+blue+")";
    document.querySelector("#appName").style.color = "rgb("+red+","+green+","+blue+")";
    document.querySelector("footer").style.backgroundColor = "rgb("+red+","+green+","+blue+")";      
}

/*Farbwerte und Booleans für Licht an/aus und Fareben aus der App steuern an/aus an Server senden*/
function sendDataToServer(){
    socket.emit("FromApp", JSON.stringify([red, green, blue]));
}