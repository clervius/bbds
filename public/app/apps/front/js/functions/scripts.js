// Toggle Buttons
$(function() {
	"use strict";
    $('.searchbutton').click(function() {
        $(this).toggleClass('active');
        $('.headline-wrapper').slideToggle('fast');
        $('#top-social').slideToggle('hide');
    });
    $('.right-area').click(function() {
        $(this).toggleClass('active');
        $('#sidebar-wrapper').show('fast');
        $('.left-sidebar').hide('1000');
    });
    $('.left-area').click(function() {
        $(this).toggleClass('active');
        $('.left-sidebar').show('3500');
        $('#sidebar-wrapper').hide('1000');
    });
    $('.center-area').click(function() {
        $(this).toggleClass('active');
        $('#main-wrapper').show('3500');
        $('.left-sidebar,#sidebar-wrapper').hide();
    });
    $('.right-area-2').click(function() {
        $(this).toggleClass('active');
        $('#sidebar-wrapper').show('fast');
        $('.left-sidebar,#main-wrapper').hide('1000');
    });
    $('.left-area-2').click(function() {
        $(this).toggleClass('active');
        $('.left-sidebar').show('3500');
        $('#sidebar-wrapper,#main-wrapper').hide('1000');
    });
    $('.menu-trigger').click(function() {
        $(this).toggleClass('active');
        $('#menu ul').slideToggle('fast');
    });
});