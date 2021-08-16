import { createInjectorType } from '@angular/compiler/src/render3/r3_injector_compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserTables } from '../Models/user/user';
import { UserTableservice } from '../Services/user.service';

@Component({
  selector: 'app-application-personal',
  templateUrl: './application-personal.component.html',
  styleUrls: ['./application-personal.component.css']
})
export class ApplicationPersonalComponent implements OnInit {
  userid:any;
  ugender = ['Default','Male','Female','Others'];
  userForm = new FormGroup({
    uname : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern('^[a-zA-Z ]*$')]),
    uemail : new FormControl('',[Validators.required,Validators.email]),
    upassword : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9!@#$%&]*$")]),
    uage : new FormControl('',[Validators.required,validAge]),
    ugender : new FormControl('',[Validators.required]),
    umobile : new FormControl('',[Validators.required,Validators.pattern("[2-9]{2}[0-9]{8}")]),
    ustate : new FormControl('',[Validators.required]),
    ucity : new FormControl('',[Validators.required]),
    upin : new FormControl('',[Validators.required]),
    uaddress : new FormControl('',[Validators.required]),
    tick : new FormControl('',[Validators.required])
  });

  users:UserTables[]=[];

  //Player object to be used in forms.
  user:UserTables={
    userId : 0,
    uname : "",
    uemail : "",
    upassword : "",
    uage : 18,
    ugender : "",
    umobile : "",
    ustate : "",
    ucity : "",
    upin : 0,
    uaddress : "",
  };

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

  constructor(private obj:UserTableservice,private router: Router) { }

  ngOnInit(): void {
  }

  get_api():void
  {
    this.obj.getAllUserTables().subscribe(data=>{
      this.users=data;
      this.flag_get=true;
      this.flag_post=false;
      this.flag_put=false;
      this.flag_delete=false;
      this.flag_register=false;
      //Logging the response recieved from web api.
      console.log(this.users);
    });
    console.log(this.users);
  }

  post_api(data:any):void
  {
    this.obj.createUser(data).subscribe(data=>{
    this.msg="Successfully created "+data.uname;
    this.userid = localStorage.setItem("userId",(String)(data.userId));
    //Logging the response received from web api.
    console.log(data);
    alert("Your Loan ID is " + data.userId)
    this.router.navigate(["/ApplyLoanVehicle"])
    })
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

export function validAge(c:AbstractControl):ValidationErrors
{
  let v:number=c.value;
  
  if(v<18)
  {
      return {'gt':true}
  }
  else if(v > 60)
    return {'gt':true}
  return {};
}
