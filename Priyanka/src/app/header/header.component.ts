import { Component, HostListener, OnInit } from '@angular/core';
import {animation} from '../animation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [animation]
})
export class HeaderComponent implements OnInit {

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }
  menu:any;
  
  scrollFunction() {
    this.menu=document.getElementById("menu");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {      
        this.menu.style.top="0";
    }
    else{
      this.menu.style.top="auto";
    }
  }

  isOpen = false;
  isOpen1=false;  
  isOpenin=false; 
  inmenu_arrow:any=false; 
  isOpenin1=false;
  inmenu_arrow1:any=false;
  isOpenin2=false;
  inmenu_arrow2:any=false;
  isOpenin3=false;
  inmenu_arrow3:any=false;
  isOpenin4=false;
  inmenu_arrow4:any=false;
  isOpenin5=false;
  inmenu_arrow5:any=false;
  isOpenin6=false;
  inmenu_arrow6:any=false;

  constructor() { }

  ngOnInit(): void {
  }

  open(){
    this.isOpen1 = !this.isOpen1;
  }

  openinnerMenu(){
    this.isOpenin=!this.isOpenin;   
    this.inmenu_arrow = (this.inmenu_arrow === 'open' ? 'closed' : 'open');
  }

  openinnerMenu1(){
    this.isOpenin1=!this.isOpenin1;   
    this.inmenu_arrow1 = (this.inmenu_arrow1 === 'open' ? 'closed' : 'open');
  }

  openinnerMenu2(){
    this.isOpenin2=!this.isOpenin2;   
    this.inmenu_arrow2 = (this.inmenu_arrow2 === 'open' ? 'closed' : 'open');
  }

  openinnerMenu3(){
    this.isOpenin3=!this.isOpenin3;   
    this.inmenu_arrow3 = (this.inmenu_arrow3 === 'open' ? 'closed' : 'open');
  }

  openinnerMenu4(){
    this.isOpenin4=!this.isOpenin4;   
    this.inmenu_arrow4 = (this.inmenu_arrow4 === 'open' ? 'closed' : 'open');
  }

  openinnerMenu5(){
    this.isOpenin5=!this.isOpenin5;   
    this.inmenu_arrow5 = (this.inmenu_arrow5 === 'open' ? 'closed' : 'open');
  }

  openinnerMenu6(){
    this.isOpenin6=!this.isOpenin6;   
    this.inmenu_arrow6 = (this.inmenu_arrow6 === 'open' ? 'closed' : 'open');
  }

  over(){
    this.isOpen = !this.isOpen;
  }

  clickedOutside(): void {    
    this.isOpen = false;
  }

  clickedOutside1(): void {
    this.isOpen1=false;    
    this.isOpenin=false;  
    this.isOpenin1=false;
    this.inmenu_arrow=false;
    this.inmenu_arrow1=false;
    this.inmenu_arrow2=false;
    this.inmenu_arrow3=false;
    this.inmenu_arrow4=false;
    this.inmenu_arrow5=false;
    this.inmenu_arrow6=false;
  }

}
