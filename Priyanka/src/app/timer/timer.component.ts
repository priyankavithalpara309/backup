import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable, of, Subscription,timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements AfterViewInit {

  subscription!: Subscription;
  everyFiveSeconds: Observable<number> = timer(0, 1000);  

  ngOnInit(): void {
    this.subscription = this.everyFiveSeconds.subscribe(() => {
      this.myTimer();
    });
  }

  months = [
    'Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec',
  ];

  cDateMillisecs: any;
  tDateMillisecs: any;
  year: number = 2022;
  month: number = 11;
  currentDate: any;
  targetDate: any;
  difference: any;
  seconds: any;
  minutes: any;
  hours: any;
  days: any;
  day: number = 30;

  ngAfterViewInit() {
    // this.myTimer();
  }

  myTimer() {
    this.currentDate = new Date();
    this.targetDate = new Date(2022, 11, 30);
    this.cDateMillisecs = this.currentDate.getTime();
    this.tDateMillisecs = this.targetDate.getTime();
    this.difference = this.tDateMillisecs - this.cDateMillisecs;
    this.seconds = Math.floor(this.difference / 1000);
    this.minutes = Math.floor(this.seconds / 60);
    this.hours = Math.floor(this.minutes / 60);
    this.days = Math.floor(this.hours / 24);  

    this.hours %= 24;
    this.minutes %= 60;
    this.seconds %= 60;
   
    this.hours = this.hours < 10 ? '0' + this.hours : this.hours;    
    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;        
  }

  constructor() {
    //this.runProgressBar();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // width: any = 0;
  //runProgressBar() {    
    //Observable.timer(0,100).takeWhile(()=>this.isWidthWithinLimit()).subscribe(()=>{      
      // this.width=this.width+25;
      // console.log(this.width);
    //})
  //}

  // isWidthWithinLimit() {
  //   if (this.width === 25) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
}
