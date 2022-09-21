function scrolll() {
    var left = document.querySelector(".scroll-text");
    left.scrollBy(-150, 0);
}
function scrollr() {
    var right = document.querySelector(".scroll-text");
    right.scrollBy(150, 0);
}


$('#arrow1').click(function() {               
    $('#section1').toggleClass('hide');           
    $('#arrow1 .fa-angle-down').toggleClass('rotate');        
    $('#section2').addClass('hide');
    $('#arrow2 .fa-angle-down').removeClass('rotate');      
    $('#section3').addClass('hide');
    $('#arrow3 .fa-angle-down').removeClass('rotate');      
    $('#section4').addClass('hide');
    $('#arrow4 .fa-angle-down').removeClass('rotate');      
    $('#section5').addClass('hide');
    $('#arrow5 .fa-angle-down').removeClass('rotate');

});

$('#arrow2').click(function() {             
    $('#section2').toggleClass('hide');   
    $('#arrow2 .fa-angle-down').toggleClass('rotate');   
    $('#section1').addClass('hide');
    $('#arrow1 .fa-angle-down').removeClass('rotate');      
    $('#section3').addClass('hide');
    $('#arrow3 .fa-angle-down').removeClass('rotate');      
    $('#section4').addClass('hide');
    $('#arrow4 .fa-angle-down').removeClass('rotate');      
    $('#section5').addClass('hide');
    $('#arrow5 .fa-angle-down').removeClass('rotate');
});
$('#arrow3').click(function() {            
    $('#section3').toggleClass('hide');
    $('#arrow3 .fa-angle-down').toggleClass('rotate');  
    $('#section2').addClass('hide');
    $('#arrow2 .fa-angle-down').removeClass('rotate');      
    $('#section1').addClass('hide');
    $('#arrow1 .fa-angle-down').removeClass('rotate');      
    $('#section4').addClass('hide');
    $('#arrow4 .fa-angle-down').removeClass('rotate');      
    $('#section5').addClass('hide');
    $('#arrow5 .fa-angle-down').removeClass('rotate'); 
});
$('#arrow4').click(function() {              
    $('#section4').toggleClass('hide');   
    $('#arrow4 .fa-angle-down').toggleClass('rotate');   
    $('#section2').addClass('hide');
    $('#arrow2 .fa-angle-down').removeClass('rotate');      
    $('#section3').addClass('hide');
    $('#arrow3 .fa-angle-down').removeClass('rotate');      
    $('#section1').addClass('hide');
    $('#arrow1 .fa-angle-down').removeClass('rotate');      
    $('#section5').addClass('hide');
    $('#arrow5 .fa-angle-down').removeClass('rotate');
});
$('#arrow5').click(function() {        
    console.log(this);    
    $('#section5').toggleClass('hide');   
    $('#arrow5 .fa-angle-down').toggleClass('rotate');   
    $('#section2').addClass('hide');
    $('#arrow2 .fa-angle-down').removeClass('rotate');      
    $('#section3').addClass('hide');
    $('#arrow3 .fa-angle-down').removeClass('rotate');      
    $('#section4').addClass('hide');
    $('#arrow4 .fa-angle-down').removeClass('rotate');      
    $('#section1').addClass('hide');
    $('#arrow1 .fa-angle-down').removeClass('rotate');
});

$(document).ready(function() {
    $('#menu').click(function() {        
        $(this).next('.inner_menu').toggle();        
        $('#menu_arrow').toggleClass('rotate');        
        $('.inner_menu').css({'margin-top':'-6px'});        
    });    
});

// $(document).ready(function() {
//     $('.setting').click(function() {        
//         $(this).next('.setting_menu').toggle();                                
//     });    
// });

$('#setting').click(function() {            
    $('#setting_menu').toggle();   
    $('#setting_menu1').hide();
    $('#setting_menu2').hide();
    $('#setting_menu3').hide();
    $('#setting_menu4').hide();
});

$('#setting1').click(function() {            
    $('#setting_menu1').toggle();       
    $('#setting_menu').hide();
    $('#setting_menu2').hide();
    $('#setting_menu3').hide();
    $('#setting_menu4').hide();
});



$('#setting2').click(function() {            
    $('#setting_menu2').toggle();       
    $('#setting_menu').hide();
    $('#setting_menu1').hide();
    $('#setting_menu3').hide();
    $('#setting_menu4').hide();
});

$('#setting3').click(function() {            
    $('#setting_menu3').toggle();       
    $('#setting_menu').hide();
    $('#setting_menu2').hide();
    $('#setting_menu1').hide();
    $('#setting_menu4').hide();
});

$('#setting4').click(function() {            
    $('#setting_menu4').toggle();       
    $('#setting_menu').hide();
    $('#setting_menu2').hide();
    $('#setting_menu3').hide();
    $('#setting_menu1').hide();
});