import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {

  feature_l=[
    {l_img:"h1-custom-icon-img-15.png", l_title:"Predictions", l_para:"Donec quam felis, ultricies nec, pellentesque eu pret ium quis, sem. Nulla consequat massa quis justo fri"},
    {l_img:"h1-custom-icon-img-16.png", l_title:"Innovation", l_para:"Donec quam felis, ultricies nec, pellentesque eu pret ium quis, sem. Nulla consequat massa quis justo fri"},
    {l_img:"h1-custom-icon-img-16.png", l_title:"Network", l_para:"Donec quam felis, ultricies nec, pellentesque eu pret ium quis, sem. Nulla consequat massa quis justo fri"}
  ]

  feature_r=[
    {r_img:"h1-custom-icon-img-18.png", r_title:"Trafficking", r_para:"Donec quam felis, ultricies nec, pellentesque eu pret ium quis, sem. Nulla consequat massa quis justo fri"},
    {r_img:"h1-custom-icon-img-19.png", r_title:"Security", r_para:"Donec quam felis, ultricies nec, pellentesque eu pret ium quis, sem. Nulla consequat massa quis justo fri"},
    {r_img:"h1-custom-icon-img-20.png", r_title:"Sell & buy", r_para:"Donec quam felis, ultricies nec, pellentesque eu pret ium quis, sem. Nulla consequat massa quis justo fri"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
