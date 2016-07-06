$(document).ready(function(){

    var red = 0;
    var green = 0;
    var blue = 0;
    var lightOn = false;
    var changeColorFromApp = false;

    var socket = io.connect();
    //Es werden Daten vom Server empfangen und die globalen Variablen gesetzt
    socket.on('ToApp', function (data) {
        if(!changeColorFromApp){
            /*RGB-Werte und Toggle-Werte vom Server in Variablen speichern*/
            red = Math.round(JSON.parse(data)[0]);
            green = Math.round(JSON.parse(data)[1]);
            blue = Math.round(JSON.parse(data)[2]);
            lightOn = JSON.parse(data)[7];
            changeColorFromApp = JSON.parse(data)[8];
            //Übergebene Werte für Slider setzen
            setSliderRGB();
            //Übergebene Werte für Toggle setzen
            setToggle();
            //Farbe im Header/Footer ändern
            changeColor(red, green, blue);
        }
    }); 
    
    //EventListener für die Slider
    $('.range').on('input change', function() {
        if(changeColorFromApp){
            var valueInput = this.value;
            var id = $(this).attr('id');
            //RGB-Werte im Text-Input ändern
            changeTextInput(id, valueInput);
            //Farbewerte neu setzen
            setRGB(id, valueInput);
        }
    });
    
    //EventListener für TextInput
    $(".sliderValue").bind('keyup change click', function () {
        if(changeColorFromApp){
            var valueInput = this.value;
            var id = $(this).attr('id');
            if(valueInput>255){
                valueInput = 255;
            }
            //RGB-Werte im Text-Input ändern
            changeRangeInput(id, valueInput);
            //Farbewerte neu setzen
            setRGB(id, valueInput);
        }
    });
    
    /*Ändern des Toggles für Licht an. Toggles sind eigentlich Buttons 
    welche über CSS verändert wurden hier würd das aussehen verändert 
    und der Wert verändern*/
    $(document).on('click', '#toggleLightOn', function() {
        //Licht wird angemacht
        if(!lightOn){
            lightOn = true; 
            $(this).addClass('toggle-selected');
        }
        //Licht wird ausgemacht
        else{
            lightOn = false;
            $(this).removeClass('toggle-selected');
            /*Wenn das Licht ausgemacht wird wird auch die Lichteinstellung
            aus der App deaktiviert*/
            if(changeColorFromApp){
                $('#toggleColorFromApp').removeClass('toggle-selected');
                changeColorFromApp = false;
            }
        }
        sendDataToServer();
    });

    /*Ändern des Toggles für Licht aus der App. Toggles sind eigentlich Buttons 
    welche über CSS verändert wurden hier würd das aussehen verändert 
    und der Wert verändern*/
    $(document).on('click', '#toggleColorFromApp', function() {
        //Nur wenn das Licht an ist kann der Button für die Farbe betätigt werden
        if(lightOn){ 
            //Lichtsetuerung aus der App wird aktiviert
            if(!changeColorFromApp){
                changeColorFromApp = true; 
                $(this).addClass('toggle-selected');
            }
            //Lichtsetuerung aus der App wird deaktiviert
            else{
                changeColorFromApp = false;
                $(this).removeClass('toggle-selected');
            }
            sendDataToServer();
        }
    });
    
    /*Ändert die Sliderwerte wenn im Input der Wert geändert wird
    @param id ist die Id von der das Event ausging
    @param valueInput ist der veränderte Farbwert*/
    function changeRangeInput(id, valueInput){
        var rangeId = id.replace('text', 'range');
        rangeId = '#' + rangeId; 
        $(rangeId).val(valueInput);
    }

    /*Ändert die Textwerte wenn im Slider der Wert geändert wird
    @param id ist die Id von der das Event ausging
    @param valueInput ist der veränderte Farbwert*/
    function changeTextInput(id, valueInput){
        var textId = id.replace('range', 'text');
        textId = '#' + textId;
        $(textId).val(valueInput);
    }

    /*Setzt die neuen Farbwerte und ruft Methoden zum ändern der Farbe und senden an den Server auf.
    @param id ist die Id von der das Event ausging
    @param valueInput ist der veränderte Farbwert*/
    function setRGB(id, valueInput){
        if(id == 'textRed' || id == 'rangeRed'){
            red = valueInput;
        }
        else if(id == 'textGreen' || id == 'rangeGreen'){
            green = valueInput;
        }
        else if(id == 'textBlue' || id == 'rangeGreen'){
            blue = valueInput;
        }
        changeColor(red, green, blue);
        sendDataToServer();
    }

    //RGB-Werte vom Server an Slider/TextInput übergeben
    function setSliderRGB(){
        $('#rangeRed').val(red);
        $('#textRed').val(red);

        $('#rangeGreen').val(green);
        $('#textGreen').val(green);
        
        $('#rangeBlue').val(blue);
        $('#textBlue').val(blue);
    }

    //Toggle-Werte vom Server an Toggle-Buttons übergeben
    function setToggle(){
        //Toggle lightOn entsprechend des übergebenen Wertes setzen
        if(lightOn){
           $('#toggleLightOn').addClass('toggle-selected'); 
        }else if(!lightOn){
           $('#toggleLightOn').removeClass('toggle-selected'); 
        }
        //Toggle changeColorFromApp entsprechend des übergebenen Wertes setzen
        if(changeColorFromApp){
           $('#toggleColorFromApp').addClass('toggle-selected'); 
        }else if(!changeColorFromApp){
           $('#toggleColorFromApp').removeClass('toggle-selected'); 
        }
    }

    /*Farbwerte und Booleans für Licht an/aus von der App an den Server senden*/
    function sendDataToServer(){
        socket.emit("FromApp", JSON.stringify([red, green, blue, lightOn, changeColorFromApp]));
    }
});