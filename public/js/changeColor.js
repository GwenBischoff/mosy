var red;
var green;
var blue;

/*Farbe im Header/Footer ändern*/
function changeColor(red, green, blue){  
    $(this).red = red;
    $(this).green = green;
    $(this).blue = blue; 
    $("selector").css("border-bottom-color", "#fff");
    $(".navIconWrapper").css("border-color", "rgb("+red+","+green+","+blue+")");
    $(".sideNavIcon").css("border-color", "rgb("+red+","+green+","+blue+")");
    $(".appName").css("color", "rgb("+red+","+green+","+blue+")");
    $("footer").css("background-color", "rgb("+red+","+green+","+blue+")");      
}
