import { DOCUMENT } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }

  btn:any;  
  scrollFunction() {    
    this.btn=document.getElementById("btn1");
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {                
        this.btn.style.display="block";
    } else {      
      this.btn.style.display="none";
    }
}

  constructor(@Inject(DOCUMENT) private document: Document) { }  

  scrollToTop(){
    return this.document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start'
    });
  }

  ngOnInit(): void {
  }

}
