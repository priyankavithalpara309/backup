import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[Clickoutside]'
})
export class ClickoutsideDirective {

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public mouseover(target: any) {    
    const clickedInside = this.elementRef.nativeElement.contains(target);        
    if (!clickedInside) {      
      this.clickOutside.emit();      
    }
  }  

}
