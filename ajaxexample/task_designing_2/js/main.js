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
