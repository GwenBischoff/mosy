$(document).ready(function(){
var width;
var height;
var widthToggle;
var widthSlider;
var heightPaddingSlider;
var ueberUnsPadding

    function setHeightToWidth(){
        width = $( window ).width();
        widthToggle = $('.toggleDivInner').width();
        widthSlider = $('.slider').width();
        if(width < 400){
            $('.navIconWrapper').css('padding-top','0.3em');
            $('.navIconWrapper').css('padding-right','0');
            $('.navIconWrapper').css('padding-bottom','0.3em');
            $('.navIconWrapper').css('padding-left','0');
        }
        if(widthToggle < 120){
            $('.toggleDivInner').width('40%');
        }
        if(widthSlider < 300){
            $('.sliderName').width('28%');
        }
    }

    function setHeightToHeight(){
        height = $( window ).height();
        heightPaddingSlider = String(Math.round(height/200))+'%';
        ueberUnsPadding = String(Math.round(height/100))+'%';
        $('.toggleDiv').css('padding-bottom', heightPaddingSlider);
        $('.sliders').css('padding-bottom', heightPaddingSlider);
        $('.textUeberUns').css('padding-top', ueberUnsPadding);
        $('.textUeberUns').css('padding-left', ueberUnsPadding);
        $('.textUeberUns').css('padding-right', ueberUnsPadding);
    }
    setHeightToWidth()    
    setHeightToHeight();
});