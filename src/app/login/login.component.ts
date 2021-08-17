import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
    this.loginService.GetAllLogins().subscribe(data=>{
      this.loginService.logins=data;
    });
  }

  login(form:NgForm){
    console.log(this.loginService.logins);
    var result=this.loginService.login(form.value.uname,form.value.upassword,form.value.uadmin);
    console.log(result);
    if(result=="user")
    {
      localStorage.setItem("uname",form.value.uname);
      this.router.navigate(['/UserDashboard']);
    }
    else if(result=="admin")
    {
      localStorage.setItem("uname",form.value.uname);
      this.router.navigate(['/AdminDashboard']);
    }
    else{
      alert("Invalid Username/password, please try again!");
      console.log("Invalid Credentials!");
    }
    form.resetForm();
  }
}