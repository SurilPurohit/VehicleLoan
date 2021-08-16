import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emi-scheduler',
  templateUrl: './emi-scheduler.component.html',
  styleUrls: ['./emi-scheduler.component.css']
})
export class EmiSchedulerComponent implements OnInit {

  amount:number=0;
  rate:number=0;
  month:number=0;
  emi:number=0;
  total:number=0;
  diff:number=0;

  constructor(private router: Router) {
  }
  
  ngOnInit() {
    this.modelChanged(event);  
    
  }

  modelChanged($event:any) 
  {
    let m = 12;

    let p = this.amount;
    let r = (this.rate/100)*(1/m);
    let n = this.month * m;

    //E= P*R[ ((1+R)^n)/ (((1+R)^n)-1)]
    this.emi = p*r*(Math.pow((1+r),n) / ((Math.pow((1+r),n))-1));
    
    this.total = this.emi * n;
    this.diff = this.total - this.amount;
  }

  onClickk(){
    this.router.navigate(["/UserDashboard"]);
  }
}
