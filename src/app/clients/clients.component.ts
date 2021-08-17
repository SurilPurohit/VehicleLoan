import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoanTables } from '../Models/user/loan';
import { LoanService } from '../Services/loan.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  
  userid:any;
  u_msg:string="";
  loanStatus : string = "";
  constructor(private obj:LoanService,private router: Router) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userId');
    console.log(this.userid);
    this.get_api();
  }

  loans : any;
  loan : LoanTables = {
    userId : 0,
    employmentType : "",
    annualSalary : 0,
    existingEmi : "",
    carMake : "",
    carModel : "",
    showroomPrice : 0,
    onRoadPrice : 0,
    loanAmount : 0,
    loanTenure : 0,
    rateOfInterest : 8,
    loanStatus : "Not Approved",
  }

  get_api():void
  {
    this.obj.getAllLoanTables().subscribe(data=>{
      this.loans = data;
      console.log(this.loans);
    });
    console.log(this.loans);
  }

  put_api(data:any):void
  {
    console.log("updating");
    this.obj.updateUser(data).subscribe(data=>{
      console.log("updated");
      this.u_msg="Successfully updated Employee";
      console.log(data);
    })
  }

  onClick(g:LoanTables){
    console.log("clicked");
    // for(let d of this.loans)
    // {
      this.loan = g;
      this.loan.loanStatus = this.loanStatus;
      // d.loanStatus = this.loanStatus;
    // }
    console.log(this.loan);
    this.put_api(this.loan);
  }

  onClickk(){
    this.router.navigate(["/AdminDashboard"]);
  }
}
