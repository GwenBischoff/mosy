$(document).ready(function(){
    //Wenn die Fenstergröße angepasst wird setHeight() aufgerufen
    $( window ).resize(function() {
        setWidth();
    });

    function setWidth(){
        //Die aktuelle Breite des Fensters wird abgerufen und mit 0.7 skalliert
        var widthImg =Math.round($(window).width()*0.5);
        //Die Breite des Bildes sollte nicht unter 400 px sein
        if(widthImg > 400){
            widthImg = 400;
        }
        //Das Bild wird der entsprechenden weite gesetzt
        $('#bird').width(widthImg);
    }
    //Wenn die Seite geladen wird setHeight() aufgerufen
    setWidth();
});