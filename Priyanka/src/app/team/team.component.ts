import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team1 = [
    { team_img1: "team-img-1.png", t_name1: "Steven Gonzalez", t_position1: "Founder & CEO", t_para1:"Aliquam lorem ante, dapibus in, vive quis, feugiat a, tellus. Phase llus viver nulla ut metus varius"},

    { team_img1: "team-img-2.png", t_name1: "Paul Ward", t_position1: "Chief Operational Officer", t_para1:"Aliquam lorem ante, dapibus in, vive quis, feugiat a, tellus. Phase llus viver nulla ut metus varius"},

    { team_img1: "team-img-3.png", t_name1: "Walter Perry", t_position1: "Lead Software Developer", t_para1:"Aliquam lorem ante, dapibus in, vive quis, feugiat a, tellus. Phase llus viver nulla ut metus varius"},

    { team_img1: "team-img-4.png", t_name1: "Gregory Silva", t_position1: "Software Architect", t_para1:"Aliquam lorem ante, dapibus in, vive quis, feugiat a, tellus. Phase llus viver nulla ut metus varius"},

    { team_img1: "team-img-5.png", t_name1: "Patrick Richardson", t_position1: "Chief Operational Officer", t_para1:"Aliquam lorem ante, dapibus in, vive quis, feugiat a, tellus. Phase llus viver nulla ut metus varius"},

    { team_img1: "team-img-6.png", t_name1: "Jeffrey Payne", t_position1: "Founder & CEO", t_para1:"Aliquam lorem ante, dapibus in, vive quis, feugiat a, tellus. Phase llus viver nulla ut metus varius"},

    { team_img1: "team-img-7.png", t_name1: "Jean Parker", t_position1: "Software Architect", t_para1:"Aliquam lorem ante, dapibus in, vive quis, feugiat a, tellus. Phase llus viver nulla ut metus varius"},

    { team_img1: "team-img-8.png", t_name1: "Samantha Andrews", t_position1: "Lead Software Developer", t_para1:"Aliquam lorem ante, dapibus in, vive quis, feugiat a, tellus. Phase llus viver nulla ut metus varius"},

  ];


  constructor() { }

  ngOnInit(): void {
  }

}
