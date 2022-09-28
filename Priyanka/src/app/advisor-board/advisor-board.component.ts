import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advisor-board',
  templateUrl: './advisor-board.component.html',
  styleUrls: ['./advisor-board.component.scss']
})
export class AdvisorBoardComponent implements OnInit {

  constructor() { }

  adv_data1 = [
    { adv_img1: "adv_img1.png", adv_name1: "James Walsh", adv_position1: "Founder & CEO" },

    { adv_img1: "adv_img2.png", adv_name1: "Nancy Ray", adv_position1: "Chief Operational Officer" },

    { adv_img1: "adv_img3.png", adv_name1: "Peter Obrien", adv_position1: "Lead Software Developer" },

    { adv_img1: "adv_img4.png", adv_name1: "George Medina", adv_position1: "Software Architect" },

    { adv_img1: "adv_img5.png", adv_name1: "Andrea Kim", adv_position1: "Software Architect" },
  ];

  ngOnInit(): void {
  }

}
