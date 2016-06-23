var red = 0;
var green = 0;
var blue = 0;

var socket = io.connect();

socket.on('ToApp', function (data) {
    console.log(data);
    red = JSON.parse(data)[0];
    green = JSON.parse(data)[1];
    blue = JSON.parse(data)[2];
    document.getElementById("rangeGreen").value = green;
    document.getElementById("rangeRed").value = red;
    document.getElementById("rangeBlue").value = blue;
    changeColor();
}); 

function showValueRed(newValue){
    red = newValue;
    document.getElementById("textRangeRed").innerHTML = red;
    changeColor();
    sendDataToServer();
}       

function showValueGreen(newValue){
    green = newValue;
    document.getElementById("textRangeGreen").innerHTML = green;
    changeColor();
    sendDataToServer();
}        

function showValueBlue(newValue){
    blue = newValue;
    document.getElementById("textRangeBlue").innerHTML = blue;  
    changeColor();
    sendDataToServer();
}

function changeColor(){    
    document.querySelector("#navIconWrapper").style.borderColor = "rgb("+red+","+green+","+blue+")";
    document.querySelector("#sideNavIcon").style.borderColor = "rgb("+red+","+green+","+blue+")";
    document.querySelector("#appName").style.color = "rgb("+red+","+green+","+blue+")";
    document.querySelector("footer").style.backgroundColor = "rgb("+red+","+green+","+blue+")";      
}

function sendDataToServer(){
    socket.emit("FromApp", JSON.stringify([red, green, blue]));
}