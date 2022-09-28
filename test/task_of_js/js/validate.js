function validate(){

    var isValid = true;
    var fnm=document.myForm.fnm.value;
    var lnm=document.myForm.lnm.value;    
    var email=document.myForm.email.value;
    var add=document.myForm.address.value;
    var phone=document.myForm.phone.value; 

    if(fnm=="")
    {
        alert("please enter first name...");                
        document.myForm.fnm.focus();
        return false;        
    }    
    else if(lnm=="")
    {
        alert("please enter Last name...");        
        document.myForm.lnm.focus();
        return false;
    }        
    else if(email=="")
    {
        alert("please enter email Id...");        
        document.myForm.email.focus();
        return false;
    }
    else if(add=="")
    {
        alert("please enter address...");        
        document.myForm.add.focus();
        return false;
    }
    else if(phone=="")
    {
        alert("please enter mobile number...");        
        document.myForm.phone.focus();
        return false;
    }
    else if(isValid) {        
        window.location="level.html";
     }    
     return false;     
}


/*
(function() {
    
    'use strict';
    window.addEventListener('load', function() {        
        var forms = document.getElementsByClassName('needs-validation');
        
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();                                                                                            
                }
                form.classList.add('was-validated');  
              
            }, false);           
        });       
    }, false);    
})();
*/

