$(document).on("ready", function(e) {

    var red = 0;
    var green = 142;
    var blue = 255;
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

    function changeBird(tempOut){
        $(this).tempOut = tempOut;
        if(tempOut<= 10){
            //Mütze
            $('#bird').attr('src', 'img/jacke.gif');
        }
        else if(tempOut> 10 && tempOut <= 15){
            //Jacke
            $('#bird').attr('src', 'img/jacke.gif'); 
        }
        else if(tempOut> 15 && tempOut <= 20){
            //Lange Hose, Pulli
            $('#bird').attr('src', 'img/langlang.gif');
        }
        else if(tempOut> 20 && tempOut <= 25){
            //Lange Hose, T-shirt 
            $('#bird').attr('src', 'img/langkurz.gif');  
        }
        else if(tempOut> 25 && tempOut <= 30){
            //Kurze Hose, Tshit
            $('#bird').attr('src', 'img/kurzkurz.gif');
        }
        else if(tempOut> 30){
            //Baden
            $('#bird').attr('src', 'img/sommer.gif');
        }
    }
});