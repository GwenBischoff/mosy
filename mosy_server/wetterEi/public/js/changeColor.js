var red = 0;
var green = 142;
var blue = 255;
var on = true;
var changeColorFromApp = true;

var socket = io.connect();

socket.on('ToApp', function (data) {
    console.log(data);
    /*RGB-Werte vom Server in Variablen speichern*/
    red = JSON.parse(data)[0];
    green = JSON.parse(data)[1];
    blue = JSON.parse(data)[2];

    /*Farbe im Header/Footer ändern*/
    changeColor();
}); 

/*Farbe im Header/Footer ändern*/
function changeColor(){    
    document.querySelector("#navIconWrapper").style.borderColor = "rgb("+red+","+green+","+blue+")";
    document.querySelector("#sideNavIcon").style.borderColor = "rgb("+red+","+green+","+blue+")";
    document.querySelector("#appName").style.color = "rgb("+red+","+green+","+blue+")";
    document.querySelector("footer").style.backgroundColor = "rgb("+red+","+green+","+blue+")";      
}
