$(document).on("ready", function(e) {

    var red = 0;
    var green = 142;
    var blue = 255;
    var width;
    var widthImg;
    var socket = io.connect();

    socket.on('ToApp', function (data) {
        /*RGB-Werte vom Server in Variablen speichern*/
        red = Math.round(JSON.parse(data)[0]);
        green = Math.round(JSON.parse(data)[1]);
        blue = Math.round(JSON.parse(data)[2]);
        tempOut = JSON.parse(data)[3];

        changeColor(red, green, blue);
        changeBird(tempOut);
        
    });

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

    function changeBird(tempOut){
        $(this).tempOut = tempOut;
        if(tempOut<= 5){
            //Mütze
            $('#bird').attr('src', 'img/jacke.gif');
        }
        else if(tempOut> 5 && tempOut <= 10){
            //Jacke
            $('#bird').attr('src', 'img/jacke.gif'); 
        }
        else if(tempOut> 10 && tempOut <= 15){
            //Lange Hose, Pulli
            $('#bird').attr('src', 'img/langlang.gif');
        }
        else if(tempOut> 15 && tempOut <= 20){
            //Lange Hose, T-shirt 
            $('#bird').attr('src', 'img/langkurz.gif');  
        }
        else if(tempOut> 20 && tempOut <= 25){
            //Kurze Hose, Tshit
            $('#bird').attr('src', 'img/kurzkurz.gif');
        }
        else if(tempOut> 25){
            //Baden
            $('#bird').attr('src', 'img/sommer.gif');
        }
    }
});