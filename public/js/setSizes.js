$(document).ready(function(){
    /*Wenn die Fenstergröße angepasst wird, wird setAccordingWidth() und    
    setAccordingHeight() aufgerufen welche das Layout ensprechend der 
    Höhe oder Breite ändern*/
    $( window ).resize(function() {
        setAccordingWidth()    
        setAccordingHeight();
    });
    //Werte werden je nach der Breite gesetzt
    function setAccordingWidth(){
        //aktuelle Breite wird abgerufen
        var width = $(window).width();
        //Elemente werden je nach Breite des Fensters gestylt
        if(width > 650){
            $('.birdDiv').css('margin-top','2em');
        }
        if(width < 400){
            $('.navIconWrapper').css('padding-top','0.3em');
            $('.navIconWrapper').css('padding-right','0');
            $('.navIconWrapper').css('padding-bottom','0.3em');
            $('.navIconWrapper').css('padding-left','0');
        }
        //Element wird je nach Breite des Div gestylt 
        if($('.toggleDivInner').width() < 120){
            $('.toggleDivInner').width('40%');
        }
        //Element wird je nach Breite des Sliders gestylt
        if($('.slider').width() < 300){
            $('.sliderName').width('28%');
        }
    }
    //Werte werden je nach der Höhe gesetzt
    function setAccordingHeight(){
        //aktuelle Höhe wird abgerufen
        var height = $(window).height();
        //Variable wird mit einem 200tel der aktuellen Höhe gefüllt
        var heightPaddingSlider = String(Math.round(height/200))+'%';
        //Variable wird mit einem 100tel der aktuellen Höhe gefüllt
        var ueberUnsPadding = String(Math.round(height/100))+'%';
        //Elemente werden mit den neuen Variablen gestylt
        $('.toggleDiv').css('padding-bottom', heightPaddingSlider);
        $('.sliders').css('padding-bottom', heightPaddingSlider);
        $('.textUeberUns').css('padding-top', ueberUnsPadding);
        $('.textUeberUns').css('padding-left', ueberUnsPadding);
        $('.textUeberUns').css('padding-right', ueberUnsPadding);
    }
    setAccordingWidth();    
    setAccordingHeight();
});