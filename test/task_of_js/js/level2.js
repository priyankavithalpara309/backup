function checked(){            
    var chk = $.map($('input[name="chk_1"]:checked'), function(c){return c.value; })
    window.localStorage.setItem('chk',chk);
    console.log(chk);
    console.log('chk'); 
    alert(chk);
    /*$('input:checkbox[name=chk_1]').each(function() 
    {    
        if($(this).is(':checked'))                                
        alert($(this).val());
        var chk=$(this).val();
        localStorage.setItem('chk',chk);
        console.log(chk);
        console.log('chk'); 
    });*/
}
$(document).ready(function (){                              
    var x1 = window.localStorage.getItem("id");                                                               
    
    if(x1=="beginner")        
    { 
      //document.write(x1);                                               
    for (var i = 1; i <= 50; i=i+10) {
      var a=1;                
       var label = document.createElement('label');
       var br = document.createElement('br');            
      var alabel = document.getElementById('container');
      var name=document.createElement('name');
      
       label.htmlFor = "lbl"+i;
       label.appendChild(Createcheckbox('chk' + i));               
       label.appendChild(document.createTextNode(" " + i + '-' + (a= i + 9)));                              
       label.appendChild(br);                              
       document.getElementById('container').appendChild(label);
       $('#container').append(br);               
      }
      function Createcheckbox(chkboxid) {
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";                
        checkbox.id = chkboxid;
        checkbox.value = i;                
        checkbox.name="chk_1";
        return checkbox;                                
      }              
    }
    if(x1=="medium")        
    {
      for (var i = 1; i <= 100; i=i+20) {
      var a=1;                
       var label = document.createElement('label');
       var br = document.createElement('br');            
      var alabel = document.getElementById('container');
      var name=document.createElement('name');
      
       label.htmlFor = "lbl"+i;
       label.appendChild(Createcheckbox('chk' + i));               
       label.appendChild(document.createTextNode(" " + i + '-'+(a = i + 19)));
       label.appendChild(br);                              
       document.getElementById('container').appendChild(label);
       $('#container').append(br);
      }
      function Createcheckbox(chkboxid) {
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";                
        checkbox.id = chkboxid;
        checkbox.value = i;   
        checkbox.name="chk_1";                                            
        return checkbox;                
      }              
    }
    if(x1=="hard")        
    {
      for (var i = 1; i <= 500; i=i+50) {
      var a=1;                
       var label = document.createElement('label');
       var br = document.createElement('br');            
      var alabel = document.getElementById('container');
      var name=document.createElement('name');
      
       label.htmlFor = "lbl"+i;
       label.appendChild(Createcheckbox('chk' + i));               
       label.appendChild(document.createTextNode(" " + i + '-'+(a = i + 49)));
       label.appendChild(br);                              
       document.getElementById('container').appendChild(label);
       $('#container').append(br);
      }
      function Createcheckbox(chkboxid) {
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";                
        checkbox.id = chkboxid;
        checkbox.value = i; 
        checkbox.name="chk_1";                                              
        return checkbox;                
      }              
    }
    if(x1=="expert")        
    {
      for (var i = 1; i <= 1000; i=i+100) {
      var a=1;                
       var label = document.createElement('label');
       var br = document.createElement('br');            
      var alabel = document.getElementById('container');
      var name=document.createElement('name');
      
       label.htmlFor = "lbl"+i;
       label.appendChild(Createcheckbox('chk' + i));               
       label.appendChild(document.createTextNode(" " + i + '-'+(a = i + 99)));
       label.appendChild(br);                              
       document.getElementById('container').appendChild(label);
       $('#container').append(br);
      }
      function Createcheckbox(chkboxid) {
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";                
        checkbox.id = chkboxid;
        checkbox.value = i;  
        checkbox.name="chk_1";                                             
        return checkbox;                
      }              
    }
    var q=window.localStorage.setItem('id',x1);
    console.log('id');
    console.log(x1);
  });