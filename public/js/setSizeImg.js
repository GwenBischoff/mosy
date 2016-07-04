$(document).ready(function(){
    var width;
    var widthImg;
    
    $( window ).resize(function() {
        setHeight();
    });

    function setHeight(){
        width = $( window ).width();
        widthImg = Math.round(width*0.7);
        if(widthImg > 400){
            widthImg = 400;
        }
        $('#bird').width(widthImg);
    }
    setHeight();
});