var red = 0;
var green = 0;
var blue = 0;

function showValueRed(newValue)
{
    red = newValue;
    document.getElementById("textRangeRed").innerHTML = red;
    changeColor();
}        

function showValueGreen(newValue)
{
    green = newValue;
    document.getElementById("textRangeGreen").innerHTML = green;
    changeColor();
}        

function showValueBlue(newValue)
{
    blue = newValue;
    document.getElementById("textRangeBlue").innerHTML = blue;
    changeColor();
}

function changeColor(){
	document.querySelector("#navDiv").style.borderColor = "rgb("+red+","+green+","+blue+")";
	document.querySelector(".sideNav").style.borderColor = "rgb("+red+","+green+","+blue+")";
	document.querySelector(".logo2").style.color = "rgb("+red+","+green+","+blue+")";
	document.querySelector("footer").style.backgroundColor = "rgb("+red+","+green+","+blue+")";
}


