import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EligibleTables } from '../Models/user/eligible';
import { EligibleService } from '../Services/eligible.service';

@Component({
  selector: 'app-eligibility-application',
  templateUrl: './eligibility-application.component.html',
  styleUrls: ['./eligibility-application.component.css']
})
export class EligibilityApplicationComponent implements OnInit {

  eligForm = new FormGroup({
    uname : new FormControl('',[Validators.required]),
    carMake : new FormControl('',[Validators.required]),
    carModel : new FormControl('',[Validators.required]),
    showroomPrice : new FormControl('',[Validators.required]),
    onRoadPrice : new FormControl('',[Validators.required]),
    loanAmt : new FormControl('',[Validators.required]),
    age : new FormControl('',[Validators.required]),
    salary : new FormControl('',[Validators.required]),
    existingEmi : new FormControl('',[Validators.required]),
    // rateOfInterest : new FormControl(''),
    loanPeriod : new FormControl('',[Validators.required]),
    tick : new FormControl('',[Validators.required]),
  })

  elig : EligibleTables[] = [];

  eli : EligibleTables = {
    uname : "",
    carMake : "",
    carModel : "",
    showroomPrice : 0,
    onRoadPrice : 0,
    loanAmt : 0,
    age : 0,
    salary : 0,
    existingEmi : "",
    rateOfInterest : 8,
    loanPeriod : 0,
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

  constructor(private obj:EligibleService,private router: Router) { }

  ngOnInit(): void {
  }

  get_api():void
  {
    this.obj.getAllEligibleTables().subscribe(data=>{
      this.elig=data;
      this.flag_get=true;
      this.flag_post=false;
      this.flag_put=false;
      this.flag_delete=false;
      this.flag_register=false;
      //Logging the response recieved from web api.
      console.log(this.elig);
    });
    console.log(this.elig);
  }

  post_api(data:any):void
  {
    console.log(data);
    let p = data.loanAmt;
    let r = (8/100)*(1/12);
    let n = data.loanPeriod * 12;

    //E= P*R[ ((1+R)^n)/ (((1+R)^n)-1)]
    var emi = p*r*(Math.pow((1+r),n) / ((Math.pow((1+r),n))-1));
    if((data.age < 18 && data.age > 60) && data.existingEmi == "No" && emi > data.salary){
      this.obj.createUser(data).subscribe(data=>{
      this.msg="Successfully created "+data.uname;
      //Logging the response received from web api.
      console.log(data);
      this.router.navigate(["/ApplyLoan"])
      })
    }else{
      console.log("EMI: "+emi);
      console.log("Not eligible");
      alert("You are not eligible for Loan since age > 60 or You have an existing EMI or Emi Value is greater than salary");
      this.router.navigate(["/Home"]);
    }
  }

  put_api(id:number,data:any):void
  {
    this.obj.updateUser(id,data).subscribe(data=>{
      this.u_msg="Successfully updated Employee "+id;
      console.log(data);
    })
  }
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
