import { Component, OnInit } from '@angular/core';
import { LoanTables } from '../Models/user/loan';
import { LoanService } from '../Services/loan.service';

@Component({
  selector: 'app-rejected-list',
  templateUrl: './rejected-list.component.html',
  styleUrls: ['./rejected-list.component.css']
})
export class RejectedListComponent implements OnInit {

  loanStatus : string = "Not Approved";
  loanss : any;

  constructor(private obj:LoanService) { }

  ngOnInit(): void {
    this.get_api();
  }


  get_api():void
  {
    console.log("yes");
    this.obj.getAllLoanTables().subscribe(data=>{
      
      console.log(this.loanss);
      for(let d of data)
      {
        console.log(d.loanStatus);
        if(d.loanStatus === this.loanStatus)
        {
          this.loanss = data;
        }
      }
    });
  }
}
