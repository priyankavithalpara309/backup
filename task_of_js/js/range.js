function calculation(){
    const
          range = document.getElementById('range'),
          rangeV = document.getElementById('rangeV'),
          setValue = ()=>{
            const
              newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
              newPosition = 10 - (newValue * 0.2);       
                           
            rangeV.innerHTML = `<span>${range.value}</span>`;                  
            rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;

            a=range.value;  
            window.localStorage.setItem('range',a);
            console.log('range');
            console.log(a);  
            
          };                
       document.addEventListener("DOMContentLoaded", setValue);             
       range.addEventListener('input', setValue);
  }
  $(document).ready(function (){                              
      var x1 = window.localStorage.getItem("id");   
      var chk=window.localStorage.getItem("chk");      
      var operation=window.localStorage.getItem("operation");                                                      
      var a;
      if(x1=="beginner")        
      {
        $('#range').attr('min', 0);
        $('#range').attr('max', 50);
        $('#range').attr('step', 10);
        calculation();                              
      }
      if(x1=="medium")        
      {
        $('#range').attr('min', 0);
        $('#range').attr('max', 100);
        $('#range').attr('step', 20);
        calculation();               
      }
      if(x1=="hard")        
      {
        $('#range').attr('min', 0);
        $('#range').attr('max', 500);
        $('#range').attr('step', 50);
        calculation();  
          
      }
      if(x1=="expert")        
      {
        $('#range').attr('min', 0);
        $('#range').attr('max', 1000);
        $('#range').attr('step', 100);
        calculation();  
      }            
     window.localStorage.setItem('id',x1);
     console.log('id');
     console.log(x1);                        
    });