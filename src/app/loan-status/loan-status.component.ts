import { Component, OnInit } from '@angular/core';
import { LoanTables } from '../Models/user/loan';
import { LoanService } from '../Services/loan.service';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.css']
})
export class LoanStatusComponent implements OnInit {

  userid:any;

  userId : number = 0;
  employmentType : string = "";
  annualSalary : number = 0;
  existingEmi : string = "";
  carMake : string = "";
  carModel : string = "";
  showroomPrice : number = 0;
  onRoadPrice : number = 0;
  loanAmount : number = 0;
  loanTenure : number = 0;
  rateOfInterest : number = 8;
  loanStatus : string = "Not Approved";
  loan : any;

  constructor(private obj:LoanService) { }

  ngOnInit(): void {
    this.userid = 1;//localStorage.getItem('userId');
    // console.log(this.userid);
    this.get_api();
  }

  get_api():void
  {
    this.obj.getAllLoanTables().subscribe(data=>{
      this.loan = data;
      for(let d of data)
      {
        if(this.userid == d.userId)
        {
          this.loan = d;
          this.userId = d.userId;
          this.employmentType = d.employmentType;
          this.annualSalary = d.annualSalary;
          this.existingEmi = d.existingEmi;
          this.carMake = d.carMake;
          this.carModel = d.carModel;
          this.showroomPrice = d.showroomPrice;
          this.onRoadPrice = d.onRoadPrice;
          this.loanAmount = d.loanAmount;
          this.loanTenure = d.loanTenure;
          this.loanStatus = d.loanStatus;
          // console.log(this.loan);
        }
      }
    });
    
    // this.obj.getLoanTablesById(1).subscribe(data=>{
      
    //   this.loan = data;
    //   console.log(this.loan);
    //   // this.UserId = data[1].userId;
    //   this.EmploymentType = data.employmentType;
    //   console.log(this.EmploymentType);
    //   this.AnnualSalary = data[1].annualSalary;
    //   this.ExistingEmi = data[1].existingEmi;
    //   this.CarMake = data[1].carMake;
    //   this.CarModel = data[1].carModel;
    //   this.ShowroomPrice = data[1].showroomPrice;
    //   this.OnRoadPrice = data[1].onRoadPrice;
    //   this.LoanAmount = data[1].loanAmount;
    //   this.LoanTenure = data[1].loanTenure;
      
    // });
  }


}
