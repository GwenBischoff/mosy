$(document).ready(function(){

    var red = 0;
    var green = 0;
    var blue = 0;
    var lightOn = false;
    var changeColorFromApp = false;

    var socket = io.connect();

    socket.on('ToApp', function (data) {
        if(!changeColorFromApp){
            console.log(data);
            /*RGB-Werte vom Server in Variablen speichern*/
            red = Math.round(JSON.parse(data)[0]);
            green = Math.round(JSON.parse(data)[1]);
            blue = Math.round(JSON.parse(data)[2]);

            /*RGB-Werte vom Server an Slider übergeben*/
            $('#rangeRed').val(red);
            $('#textRangeRed').html(red);

            $('#rangeGreen').val(green);
            $('#textRangeGreen').html(green);
            
            $('#rangeBlue').val(blue);
            $('#textRangeBlue').html(blue);
            /*Farbe im Header/Footer ändern*/
            changeColor(red, green, blue);
        }
    }); 

    $(document).on('click', '#toggleLightOn', function() {
        $(this).toggleClass('toggle-selected');
        if(!lightOn){
            lightOn = true; 
            //Enable ranges
            /*$("#rangeRed").disabled = false;
            $("#rangeGreen").disabled = false;
            $("#rangeBlue").disabled = false;*/
        }
        else{
            lightOn = false;
            //Disable #toggleColorFromApp if changeColorFromApp=true
            if(changeColorFromApp){
                $('#toggleColorFromApp').toggleClass('toggle-selected');
                changeColorFromApp = false;
                //Disable ranges
                /*$("#rangeRed").disabled = true;
                $("#rangeGreen").disabled = true;
                $("#rangeBlue").disabled = true;*/
            }
        }
        sendDataToServer();
    });

    $(document).on('click', '#toggleColorFromApp', function() {
        $(this).toggleClass('toggle-selected'); 
        if(!changeColorFromApp){
            changeColorFromApp = true; 
        }
        else{
            changeColorFromApp = false;
        }
        sendDataToServer();
    });

    //EventListener Slider für rote Farbwerte
    $('#rangeRed').on('input change', function() {
        if(changeColorFromApp){
            red = this.value;
            $('#textRangeRed').html(red);
            changeColor(red, green, blue);
            sendDataToServer();
        }
    });

    /*EventListener Slider für grüne Farbwerte*/
    $('#rangeGreen').on('input change', function() {
        if(changeColorFromApp){
            green = this.value;
            $('#textRangeGreen').html(green);
            changeColor(red, green, blue);
            sendDataToServer(); 
        }     
    });

    /*EventListener Slider für blaue Farbwerte*/
    $('#rangeBlue').on('input change', function() {
        if(changeColorFromApp){
            blue = this.value;
            $('#textRangeBlue').html(blue);  
            changeColor(red, green, blue);
            sendDataToServer();
        }
    });

    /*Farbwerte und Booleans für Licht an/aus und Fareben aus der App steuern an/aus an Server senden*/
    function sendDataToServer(){
        socket.emit("FromApp", JSON.stringify([red, green, blue, lightOn, changeColorFromApp]));
    }
});