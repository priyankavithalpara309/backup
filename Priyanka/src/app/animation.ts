import { trigger,state,style,animate,transition} from '@angular/animations';
import { GrowYourCapitalComponent } from './grow-your-capital/grow-your-capital.component';

export const animation = [
    trigger('hover',[      
        state('closed',style({
          display:'none',        
          height:0,
          opacity:0        
        })),
        state('open',style({     
          display:'block',          
          opacity:1,                
        })),              
        transition('open<=>closed',[
          style({ display: 'block' }),         
          animate('0.5s')        
        ]),        
      ]),

      trigger('openclose',[      
        state('closed',style({
          display:'none',        
          height:0,
          opacity:0
        })),
        state('open',style({     
          display:'block',          
          opacity:1
        })),              
        transition('open<=>closed',[
          style({ display: 'block' }),         
          animate('0.5s')        
        ]),        
      ]),

      trigger('rotatedState1',[
        state('closed', style({ transform: 'rotate(0)'})),
        state('open', style({ transform: 'rotate(90deg)'})),
        transition('closed => open', animate('900ms ease-out')),
        transition('open => closed', animate('400ms ease-in'))
    ]),
  
      trigger('rotatedState',[
          state('default', style({ transform: 'rotate(0)' })),
          state('rotated', style({ transform: 'rotate(-180deg)' })),
          transition('rotated => default', animate('900ms ease-out')),
          transition('default => rotated', animate('400ms ease-in'))
      ])      
];
  