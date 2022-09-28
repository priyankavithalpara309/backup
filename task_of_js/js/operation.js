function checked(){            
    var chk = $.map($('input[type="checkbox"]:checked'), function(c){return c.value; })
    window.localStorage.setItem('operation',chk);
    console.log(chk);
    console.log('operation'); 
    alert(chk);
}
$(document).ready(function (){                              
    var x1 = window.localStorage.getItem("id");                                                   
    var chk=window.localStorage.getItem("chk");            
   
    if(x1=="beginner")        
    { 
      //document.write(x1);                                               
      makeCheckboxes(" Add (+)");
      function makeCheckboxes(str) {
        var a = document.getElementById("chk");
        var arr = str.split(",");
        var returnStr = "";
        for (i = 0; i < arr.length; i++) {
            returnStr += '<input type="checkbox" name="chk_' + i + '" id="chk' + i + '" value="'+i+ '" />' + arr[i];
        }
        a.innerHTML = returnStr;
        }
    }
    if(x1=="medium")        
    {
        //document.write(x1);  
        makeCheckboxes(" Add (+), Sub (-)");
        function makeCheckboxes(str) {
        var a = document.getElementById("chk");
        var arr = str.split(",");
        var returnStr = "";
        for (i = 0; i < arr.length; i++) {
            returnStr += '<input type="checkbox" name="chk_' + i + '" id="chk' + i + '" value="'+i+'" />' + arr[i]+'<br/>';
        }
        a.innerHTML = returnStr;
        }
    }
    if(x1=="hard")        
    {
        //document.write(x1);  
        makeCheckboxes(" Add (+), Sub (-), Mul (*)");
        function makeCheckboxes(str) {
        var a = document.getElementById("chk");
        var arr = str.split(",");
        var returnStr = "";
        for (i = 0; i < arr.length; i++) {
            returnStr += '<input type="checkbox" name="chk_' + i + '" id="chk' + i + '" value="' + i + '" />' + arr[i]+'<br/>';
        }
        a.innerHTML = returnStr;
        }
    }
    if(x1=="expert")        
    {
        //document.write(x1);  
        makeCheckboxes(" Add (+), Sub (-), Mul (*), Div (/)");
        function makeCheckboxes(str) {
        var a = document.getElementById("chk");
        var arr = str.split(",");
        var returnStr = "";
        for (i = 0; i < arr.length; i++) {
            returnStr += '<input type="checkbox" name="chk_' + i + '" id="chk' + i + '" value="' + i + '" />' + arr[i]+'<br/>';
        }
        a.innerHTML = returnStr;
        }
    }
    var q=window.localStorage.setItem('id',x1);
    console.log('id');
    console.log(x1);
  });