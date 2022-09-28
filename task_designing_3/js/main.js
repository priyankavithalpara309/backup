function scrolll() {
    var left = document.querySelector(".scroll-text");
    left.scrollBy(-150, 0);
}
function scrollr() {
    var right = document.querySelector(".scroll-text");
    right.scrollBy(150, 0);
}

// $('.child').click(function(){
//     var $toggle = $(this).parents(':eq(4)').next().children().children().children().children().next('.detail_sec');                  
//     console.log($toggle);
//     $toggle.toggle(500);
//     $('.detail_sec').not($toggle).slideUp(600);

//     var $arrow = $toggle.find(".fa-angle-down");
//     console.log($arrow);
//     $arrow.toggleClass('rotate');
//     $('.fa-angle-down').not($arrow).removeClass('rotate');     
// })

$('#title1').click(function(){
    $('#section1').toggle(500);        
    var $arrow = $('#arrow1').find(".fa-angle-down");
    $arrow.toggleClass('rotate');    
    $('.fa-angle-down').not($arrow).removeClass('rotate');        
    $('.detail_sec').not('#section1').slideUp(600);    
    $('html,body').animate({        
        scrollTop: $("#section1").offset().top-170
    }, 'slow');
});

$('#title2').click(function(){
    $('#section2').toggle(500);    
    var $arrow = $('#arrow2').find(".fa-angle-down");
    $arrow.toggleClass('rotate');
    $('.fa-angle-down').not($arrow).removeClass('rotate');    
    $('.detail_sec').not('#section2').slideUp(600);
    if($("#section1").is(":visible")){        
        $('html,body').animate({                    
            scrollTop: $("#section1").offset().top - $("#section2").offsetParent().offset().top-60
        }, 'slow');                       
    }
    else{        
        $('html,body').animate({        
            scrollTop: $("#section2").offset().top-170
        }, 'slow');        
    }    
    // $('html,body').animate({        
    //     scrollTop: $("#section2").offset().top-170
    // }, 'slow');    
});

$('#title3').click(function(){
    $('#section3').toggle(500);
    var $arrow = $('#arrow3').find(".fa-angle-down");
    $arrow.toggleClass('rotate');
    $('.fa-angle-down').not($arrow).removeClass('rotate');    
    $('.detail_sec').not('#section3').slideUp(600);
    if($("#section2").is(":visible")){          
        $('html,body').animate({        
            scrollTop: $("#section2").offset().top - $("#section3").offsetParent().offset().top-60
        }, 'slow');             
    }
    else{        
        $('html,body').animate({        
            scrollTop: $("#section3").offset().top-170
        }, 'slow');        
    }    
    // $('html,body').animate({
    //     scrollTop: $("#section3").offset().top-170
    // }, 'slow');
});

$('#title4').click(function(){
    $('#section4').toggle(500);
    var $arrow = $('#arrow4').find(".fa-angle-down");
    $arrow.toggleClass('rotate');
    $('.fa-angle-down').not($arrow).removeClass('rotate');        
    $('.detail_sec').not('#section4').slideUp(600);    
    if($("#section3").is(":visible")){        
        $('html,body').animate({        
            scrollTop: $("#section3").offset().top - $("#section4").offsetParent().offset().top-60
        }, 'slow');                
    }
    else{        
        $('html,body').animate({        
            scrollTop: $("#section4").offset().top-170
        }, 'slow');        
    }    
    // $('html,body').animate({
    //     scrollTop: $("#section4").offset().top-170
    // }, 'slow');
});

$('#title5').click(function(){
    $('#section5').toggle(500);
    var $arrow = $('#arrow5').find(".fa-angle-down");
    $arrow.toggleClass('rotate');
    $('.fa-angle-down').not($arrow).removeClass('rotate');    
    $('.detail_sec').not('#section5').slideUp(600);    
    if($("#section4").is(":visible")){        
        $('html,body').animate({        
            scrollTop: $("#section4").offset().top - $("#section5").offsetParent().offset().top-60
        }, 'slow');                
    }
    else{        
        $('html,body').animate({        
            scrollTop: $("#section5").offset().top-170
        }, 'slow');        
    }    
    // $('html,body').animate({
    //     scrollTop: $("#section5").offset().top-170
    // }, 'slow');
});

$('.list_item').click(function() {        
   var $toggle = $(this).parent().next('.detail_sec');              
    $toggle.toggle(500);
    $('.detail_sec').not($toggle).slideUp(600);
    var $arrow = $(this).find(".fa-angle-down");
    $arrow.toggleClass('rotate');
    $('.fa-angle-down').not($arrow).removeClass('rotate');    
});

$(document).ready(function() {
    $('#menu').click(function() {        
        $(this).next('.inner_menu').slideToggle(500);        
        $('#menu_arrow').toggleClass('rotate');        
        $('#menu').toggleClass('menu_btn');        
        // $('.inner_menu').css({'margin-top':'-6px'});        
    });    
});

$('.setting').on('click', function () {
    var $setting_menu = $(this).next('.setting_menu');
    $setting_menu.slideToggle(500);
    $('.setting_menu').not($setting_menu).slideUp(600);              
});

window.addEventListener('click', function(event) {    
    var settingsec = $(".setting_sec");        
    if (!settingsec.is(event.target) && !settingsec.has(event.target).length){
            // console.log(container);
            $('.setting_menu').slideUp(300);
        }    
});

// $("#title1").click(function() {
//     $('html,body').animate({
//         scrollTop: $("#section1").offset().top-170}, 'slow');        
// });

// $("#title2").click(function() {
//     $('html,body').animate({                
//         scrollTop: $("#section2").offset().top-170}, 'slow');        
// });

// $("#title3").click(function() {
//     $('html,body').animate({
//         scrollTop: $("#section3").offset().top-170}, 'slow');
// });

// $("#title4").click(function() {
//     $('html,body').animate({
//         scrollTop: $("#section4").offset().top-170}, 'slow');
// });

// $("#title5").click(function() {
//     $('html,body').animate({
//         scrollTop: $("#section5").offset().top-170}, 'slow');
// });

// $(document).ready(function() {
//     $('.setting').click(function() {        
//         $(this).next('.setting_menu').toggle();                                
//     });    
// });

// $('#setting').click(function() {            
//     $('#setting_menu').toggle();   
//     $('#setting_menu1').hide();
//     $('#setting_menu2').hide();
//     $('#setting_menu3').hide();
//     $('#setting_menu4').hide();
// });

// $('#setting1').click(function() {            
//     $('#setting_menu1').toggle();       
//     $('#setting_menu').hide();
//     $('#setting_menu2').hide();
//     $('#setting_menu3').hide();
//     $('#setting_menu4').hide();
// });



// $('#setting2').click(function() {            
//     $('#setting_menu2').toggle();       
//     $('#setting_menu').hide();
//     $('#setting_menu1').hide();
//     $('#setting_menu3').hide();
//     $('#setting_menu4').hide();
// });

// $('#setting3').click(function() {            
//     $('#setting_menu3').toggle();       
//     $('#setting_menu').hide();
//     $('#setting_menu2').hide();
//     $('#setting_menu1').hide();
//     $('#setting_menu4').hide();
// });

// $('#setting4').click(function() {            
//     $('#setting_menu4').toggle();       
//     $('#setting_menu').hide();
//     $('#setting_menu2').hide();
//     $('#setting_menu3').hide();
//     $('#setting_menu1').hide();
// });