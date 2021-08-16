import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterTables } from '../Models/user/register';
import { RegisterTablesService } from '../Services/register.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  registers:RegisterTables[] = [];
  // ruserId : number = 0;
  name : any;
  userId : number = 0;
  username : string = "";
  email : string = "";
  password : string = "";
  age : number = 0;
  gender : string = "";
  mobile : string = "";

  // userdata:RegisterTables[] = [];

  userdata:RegisterTables = {
    ruserId : 0,
    rname : "",
    runame : "",
    remail : "",
    rpassword : "",
    rage : 0,
    rgender : "",
    rmobile : "",
  };

  // userdata : RegisterTables = new ;
  constructor(private obj:RegisterTablesService,private router:Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('uname');
    this.get_api();
  }

  u_msg:string="";

  get_api():void
  {
    this.obj.getUserTablesByName(this.name).subscribe(data=>{
      this.userdata = data;
      this.name = data.rname;
      this.username = data.runame;
      this.email = data.remail;
      this.mobile = data.rmobile;
      this.password = data.rpassword;
      this.age = data.rage;
      this.gender = data.rgender;
      this.userId = data.ruserId;
      console.log(data.ruserId);
      //Logging the response recieved from web api.
      console.log(this.userdata);
    });
    // console.log(this.registers);
  }

  put_api(id:number,data:any):void
  {
    console.log("entering");
    this.obj.updateUser(id,data).subscribe(data=>{
      this.u_msg="Successfully updated Employee "+id;
      console.log("updated")
    })
  }

  onSubmit():void{
    console.log(this.email);
    this.userdata.rpassword = this.password;
    this.userdata.remail = this.email;
    this.put_api(this.userId,this.userdata);
  }

  onClickk(){
    this.router.navigate(["/UserDashboard"]);
  }
}
