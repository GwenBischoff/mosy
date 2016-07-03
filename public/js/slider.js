$(document).ready(function(){

    var red = 0;
    var green = 0;
    var blue = 0;
    var lightOn = false;
    var changeColorFromApp = false;

    var socket = io.connect();

    socket.on('ToApp', function (data) {
        if(!changeColorFromApp){
            /*RGB-Werte vom Server in Variablen speichern*/
            red = Math.round(JSON.parse(data)[0]);
            green = Math.round(JSON.parse(data)[1]);
            blue = Math.round(JSON.parse(data)[2]);

            lightOn = JSON.parse(data)[7];
            changeColorFromApp = JSON.parse(data)[8];
            /*RGB-Werte vom Server an Slider übergeben*/
            $('#rangeRed').val(red);
            $('#textRed').val(red);

            $('#rangeGreen').val(green);
            $('#textRangeGreen').val(green);
            
            $('#rangeBlue').val(blue);
            $('#textRangeBlue').val(blue);
            /*Farbe im Header/Footer ändern*/
            changeColor(red, green, blue);

            //Toggle lightOn entsprechend des übergebenen Wertes setzen
            if(lightOn){
               $('#toggleLightOn').addClass('toggle-selected'); 
            }
            else if(!lightOn){
               $('#toggleLightOn').removeClass('toggle-selected'); 
            }
            //Toggle changeColorFromApp entsprechend des übergebenen Wertes setzen
            if(changeColorFromApp){
               $('#toggleColorFromApp').addClass('toggle-selected'); 
            }
            else if(!changeColorFromApp){
               $('#toggleColorFromApp').removeClass('toggle-selected'); 
            }
        }
    }); 

    //Abfrage Toggle Licht an
    $(document).on('click', '#toggleLightOn', function() {
        if(!lightOn){
            lightOn = true; 
            $(this).addClass('toggle-selected');
        }
        else{
            lightOn = false;
            $(this).removeClass('toggle-selected');
            //Disable #toggleColorFromApp if changeColorFromApp=true
            if(changeColorFromApp){
                $('#toggleColorFromApp').removeClass('toggle-selected');
                changeColorFromApp = false;
            }
        }
        sendDataToServer();
    });

    //Abfrage Toggle Licht aus der App
    $(document).on('click', '#toggleColorFromApp', function() {
        if(lightOn){ 
            if(!changeColorFromApp){
                changeColorFromApp = true; 
                $(this).addClass('toggle-selected');
            }
            else{
                changeColorFromApp = false;
                $(this).removeClass('toggle-selected');
            }
            sendDataToServer();
        }
    });

    //EventListener Slider für rote Farbwerte
    $('#rangeRed').on('input change', function() {
        if(changeColorFromApp){
            red = this.value;
            $('#textRed').val(red);
            changeColor(red, green, blue);
            sendDataToServer();
        }
    });

    /*EventListener Slider für grüne Farbwerte*/
    $('#rangeGreen').on('input change', function() {
        if(changeColorFromApp){
            green = this.value;
            $('#textRangeGreen').val(green);
            changeColor(red, green, blue);
            sendDataToServer(); 
        }     
    });

    /*EventListener Slider für blaue Farbwerte*/
    $('#rangeBlue').on('input change', function() {
        if(changeColorFromApp){
            blue = this.value;
            $('#textRangeBlue').val(blue);  
            changeColor(red, green, blue);
            sendDataToServer();
        }
    });

    /*Farbwerte und Booleans für Licht an/aus und Farben aus der App steuern an/aus an Server senden*/
    function sendDataToServer(){
        socket.emit("FromApp", JSON.stringify([red, green, blue, lightOn, changeColorFromApp]));
    }
});