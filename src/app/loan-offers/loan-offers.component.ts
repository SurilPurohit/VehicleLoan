import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EligibleTables } from '../Models/user/eligible';
import { EligibleService } from '../Services/eligible.service';

@Component({
  selector: 'app-loan-offers',
  templateUrl: './loan-offers.component.html',
  styleUrls: ['./loan-offers.component.css']
})
export class LoanOffersComponent implements OnInit {

  CarMake:string="";
  CarModel:string="";
  LoanAmount:number=0;
  LoanPeriod:number=0;
  emi:number=0;

  constructor(private obj:EligibleService, private route:ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

    const routeparams = this.route.snapshot.paramMap;
    const eligId = Number(routeparams.get('eligId'));
    this.get_api(eligId);
    console.log(eligId);
  }

  vehicle : any;
  
  get_api(eligId:number):void
  {
    this.obj.getEligibleTablesById(eligId).subscribe(data=>{
      this.vehicle = data;
      this.CarMake = data.carMake;
      this.CarModel = data.carModel;
      this.LoanAmount = data.loanAmt;
      this.LoanPeriod = data.loanPeriod;
      let p = this.LoanAmount;
      let r = (8/100)*(1/12);
      let n = this.LoanPeriod * 12;

      //E= P*R[ ((1+R)^n)/ (((1+R)^n)-1)]
      this.emi = p*r*(Math.pow((1+r),n) / ((Math.pow((1+r),n))-1));
      this.emi = Math.round(this.emi*10^2)/10^2;
      console.log(this.vehicle);
    });
    console.log(this.vehicle);
  }

  next_page(){
    this.router.navigate(["/ApplyLoan"]);
  }
}
