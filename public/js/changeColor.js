/*Farbe im Header/Footer ändern
 *@param red gibt den RGB-Wert für den roten Wert an
 *@param green gibt den RGB-Wert für den grünen Wert an
 *@param blue gibt den RGB-Wert für den blauen Wert an*/
function changeColor(red, green, blue){  
	//Farbe unterhalb des Headers ändern
    $(".navIconWrapper").css("border-color", "rgb("+red+","+green+","+blue+")");
    //Farbe des Namens ändern
    $(".appName").css("color", "rgb("+red+","+green+","+blue+")");
    //Farbe des Footer ändern
    $("footer").css("background-color", "rgb("+red+","+green+","+blue+")");      
}
