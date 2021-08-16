import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanTables } from '../Models/user/loan';
import { LoanService } from '../Services/loan.service';

@Component({
  selector: 'app-application-vehicle',
  templateUrl: './application-vehicle.component.html',
  styleUrls: ['./application-vehicle.component.css']
})
export class ApplicationVehicleComponent implements OnInit {

  type = ["Select","Government Employee","Private Employee","Self Employed"];
  loanForm = new FormGroup({
    userId : new FormControl('',[Validators.required]),
    employmentType : new FormControl('',[Validators.required]),
    annualSalary : new FormControl('',[Validators.required]),
    existingEmi : new FormControl('',[Validators.required]),
    carMake : new FormControl('',[Validators.required]),
    carModel : new FormControl('',[Validators.required]),
    showroomPrice : new FormControl('',[Validators.required]),
    onRoadPrice : new FormControl('',[Validators.required]),
    loanAmount : new FormControl('',[Validators.required]),
    loanTenure : new FormControl('',[Validators.required]),
    tick : new FormControl('',[Validators.required]),
    rateOfInterest : new FormControl('8')
  })

  loans : LoanTables[] = [];
  userid : any;
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
  
  //Other required variables.
  msg:string="";
  u_msg:string="";
  d_msg:string="";
  e_msg:string="";

  flag_get:boolean=false;
  flag_post:boolean=false;
  flag_put:boolean=false;
  flag_delete:boolean=false;
  flag_register:boolean=false;

  update_id:number=0;
  delete_id:number=0;

  constructor(private obj:LoanService,private router: Router) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userId');
    console.log(this.userid);
  }

  get_api():void
  {
    this.obj.getAllLoanTables().subscribe(data=>{
      this.loans=data;
      this.flag_get=true;
      this.flag_post=false;
      this.flag_put=false;
      this.flag_delete=false;
      this.flag_register=false;
      //Logging the response recieved from web api.
      console.log(this.loans);
    });
    console.log(this.loans);
  }

  post_api(data:any):void
  {
    console.log(data);
    this.obj.createUser(data).subscribe(data=>{
    this.msg="Successfully created "+data.userId;
    //Logging the response received from web api.
    console.log(data);
    this.router.navigate(["/UploadFiles"])
    })
  }

  // put_api(id:number,data:any):void
  // {
  //   this.obj.updateUser(id,data).subscribe(data=>{
  //     this.u_msg="Successfully updated Employee "+id;
  //     console.log(data);
  //   })
  // }
  delete_api(id:number):void
  {
    this.obj.deleteUser(id).subscribe(data=>{
      this.d_msg="Successfully deleted  "+id;
      console.log(data);
    })  
  }

  error_api():void
  {
    this.flag_get=false;
    this.flag_post=false;
    this.flag_put=false;
    this.flag_delete=false;
    this.flag_register=true;

    this.obj.register().subscribe((data)=>{
    console.log(data);
    },
    (error)=>{
    this.e_msg=error;
    }
    );
  }

  btn_post():void
  {
    this.flag_get=false;
    this.flag_post=true;
    this.flag_put=false;
    this.flag_delete=false;
    this.flag_register=false;
  }
  
  btn_put():void
  {
    this.flag_get=false;
    this.flag_post=false;
    this.flag_put=true;
    this.flag_delete=false;
    this.flag_register=false;
  }

  btn_delete():void
  {
    this.flag_get=false;
    this.flag_post=false;
    this.flag_put=false;
    this.flag_delete=true;
    this.flag_register=false;
  }
}
