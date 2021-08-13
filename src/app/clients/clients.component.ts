import { Component, OnInit } from '@angular/core';
import { LoanTables } from '../Models/user/loan';
import { LoanService } from '../Services/loan.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  constructor(private obj:LoanService) { }

  ngOnInit(): void {

    this.get_api();
  }

  loans : LoanTables[] = [];

  get_api():void
  {
    this.obj.getAllLoanTables().subscribe(data=>{
      this.loans=data;
      console.log(this.loans);
    });
    console.log(this.loans);
  }

  onClick(){}
}
