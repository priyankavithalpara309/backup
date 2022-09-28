import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-strategic-partners',
  templateUrl: './strategic-partners.component.html',
  styleUrls: ['./strategic-partners.component.scss']
})

export class StrategicPartnersComponent implements OnInit {


  logos1 = [
    { logo_img: "rko.png", logo_img_h: "h_rko.png"},
    { logo_img: "finance.png", logo_img_h: "h_finance.png"},
    { logo_img: "techstart.png", logo_img_h: "h_techstart.png"},
    { logo_img: "avory.png", logo_img_h: "h_avory.png"},
    { logo_img: "aliqua.png", logo_img_h: "h_aliqua.png"},
    { logo_img: "r.png", logo_img_h: "h_r.png"},
    { logo_img: "cillum.png", logo_img_h: "h_cillum.png"},
    { logo_img: "techcompany.png", logo_img_h: "h_techcompany.png"},
    { logo_img: "flash.png", logo_img_h: "h_flash.png"},
    { logo_img: "e-book.png", logo_img_h: "h_e-book.png"},
    { logo_img: "infinity.png", logo_img_h: "h_infinity.png"},
    { logo_img: "start-it.png", logo_img_h: "h_start-it.png"}
  ]

  // logo_img = ['rko.png','finance.png','techstart.png','avory.png','aliqua.png','r.png','cillum.png','techcompany.png','flash.png','e-book.png','infinity.png','start-it.png'];

  // logo_img_h=['h_rko.png','h_finance.png','h_techstart.png','h_avory.png','h_aliqua.png','h_r.png','h_cillum.png','h_techcompany.png','h_flash.png','h_e-book.png','h_infinity.png','h_start-it.png'];
    
  constructor() { }


  ngOnInit(): void {
  }

}
