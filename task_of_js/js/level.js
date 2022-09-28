$(document).ready(function (){
    $(".btn-light").click(function(event){                                                       
        $('.active').removeClass('active');
        $(this).addClass('active');                
        event.preventDefault();         
        var a = $('.active').attr('id');
     //   var a = $(this).attr('id');                                
        window.localStorage.setItem('id',a);    
        console.log(a);
        console.log('id');
        
    });                              
});            