$('.slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
});
$('.selector').slick({
    nextArrow: '<i class="fa fa-arrow-right"></i>',
    prevArrow: '<i class="fa fa-arrow-left"></i>',
    // add the rest of your options here
});

$(document).ready(function () {
    $('.product_sec .tabs li[id^="tab"]').click(function () {
        var targetID = $(this).attr('href');
        var target = $('.slide_content #' + targetID);

        $('.product_sec .tabs li').removeClass('active');
        $(this).addClass('active');

        $('.slide_content li[id^="tab"]').hide();
        target.show();

    });

    //SlideShow
    var width = $('.slideshow li').width();


    // $('#slideshow').css({'margin-left':-width});

    $('.slideshow li:last-child').prependTo($(this).parent('ul'));

    $('.product_sec ul.slide_content li div#prev1').click(function () {
        var targ = $(this).parent('li').find('ul');

        targ.animate({ 'left': '+=200px' }, 300, function () {
            targ.find('li:last-child').prependTo(targ);
            targ.css('left', '');
        });
    });

    $('.product_sec ul.slide_content li div#next1').click(function () {

        var targ = $(this).parent('li').find('ul');


        targ.animate({ 'left': '-=200px' }, 300, function () {
            targ.find('li:first-child').appendTo(targ);
            targ.css('left', '');
        });
    });
})


$(document).ready(function () {
    $(".btn_menu").click(function () {
        $(".main-nav").toggle(500);
    });
});


$(document).ready(function () {
    $(".ser").click(function () {
        $(".ser").toggle();
        $("#ser_box").toggle(500);
        $("nav").toggleClass("nav_top");
    });
});



$(document).ready(function () {
    $("#arrow1").click(function () {
        $(".section1").toggle(500);
        $("#arrow1").toggleClass('rotate');
    });
});

$(document).ready(function () {
    $("#arrow2").click(function () {
        $(".section2").toggle(500);
        $("#arrow2").toggleClass('rotate');
    });
});

$(document).ready(function () {
    $("#arrow3").click(function () {
        $(".section3").toggle(500);
        $("#arrow3").toggleClass('rotate');
    });
});

$(document).ready(function () {
    $("#arrow4").click(function () {
        $(".section4").toggle(500);
        $("#arrow4").toggleClass('rotate');
    });
});

function responsive_nav(max_width) {
    if (max_width.matches) {
        $(".main-nav").css({ display: 'none' });
        $('#btn_search1').css({ display: 'block' });
    }
    else {
        $(".main-nav").css({ display: 'flex' });
        $("#ser_box").css({ display: 'none' });
        $("nav").removeClass('nav_top');
        $(".ser").css({ display: 'none' });
    }

}
var max_width = window.matchMedia("(max-width:666px)");
responsive_nav(max_width);
max_width.addListener(responsive_nav);


function responsive1(max_width1) {
    if (max_width1.matches) {
        $(".section1").css({ display: 'none' });
        $("#arrow1").removeClass('rotate');
        $(".section2").css({ display: 'none' });
        $("#arrow2").removeClass('rotate');
        $(".section3").css({ display: 'none' });
        $("#arrow3").removeClass('rotate');
        $(".section4").css({ display: 'none' });
        $("#arrow4").removeClass('rotate');
    }
    else {
        $(".section1").css({ display: 'block' });
        $(".section2").css({ display: 'block' });
        $(".section3").css({ display: 'block' });
        $(".section4").css({ display: 'block' });
    }

}
var max_width1 = window.matchMedia("(max-width:479px)");
responsive1(max_width1);
max_width1.addListener(responsive1);
