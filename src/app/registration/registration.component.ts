import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterTables } from '../Models/user/register';
import { RegisterTablesService } from '../Services/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  rgender = ['Default','Male','Female','Others'];
  registerForm = new FormGroup({
    rname : new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(15),Validators.pattern('^[a-zA-Z ]*$')]),
    runame : new FormControl('',[Validators.required]),
    remail : new FormControl('',[Validators.required,Validators.email]),
    rpassword : new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9!@#$%&]*$")]),
    rcpassword : new FormControl('',[Validators.required,compare]),
    rage : new FormControl('',[Validators.required,validAge]),
    rgender : new FormControl('',[Validators.required]),
    rmobile : new FormControl('',[Validators.required,Validators.pattern("[2-9]{2}[0-9]{8}")]),
    tick : new FormControl('',[Validators.required])
  });

  registers:RegisterTables[] = [];

  register:RegisterTables = {
    rname : "",
    runame : "",
    remail : "",
    rpassword : "",
    rage : 0,
    rgender : "",
    rmobile : "",
  };

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

  constructor(private obj:RegisterTablesService,private router: Router) {}

  // constructor() {}
  

  ngOnInit(): void {
  }

  // submitForm()
  // {
  //   this.router.navigate(['/Login']);
  // }

  get_api():void
  {
    this.obj.getAllUserTables().subscribe(data=>{
      this.registers=data;
      this.flag_get=true;
      this.flag_post=false;
      this.flag_put=false;
      this.flag_delete=false;
      this.flag_register=false;
      //Logging the response recieved from web api.
      console.log(this.registers);
    });
    console.log(this.registers);
  }

  post_api(data:any):void
  {
    this.obj.createUser(data).subscribe(data=>{
    this.msg="Successfully created "+data.rname;
    //Logging the response received from web api.
    console.log(data);
    this.router.navigate(['/Login']);
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
  else if(v > 100)
    return {'gt':true}
  return {};
}

export function compare(c:AbstractControl):ValidationErrors
{
  let controlvalue:string=c.value;

  //password
  let comparevalue:string=c.root.get("rpassword")?.value;
  //comparing both
  if(!(controlvalue==comparevalue))
  {
    return {'compare':true}
  }
  return {};

}