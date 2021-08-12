import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-user-dash',
  templateUrl: './user-dash.component.html',
  styleUrls: ['./user-dash.component.css']
})
export class UserDashComponent implements OnInit {
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    
    this.loginService.GetAllLogins().subscribe(data=>{
      this.loginService.logins=data;
    });
    console.log(this.loginService.logins);
    // this.uname = localStorage.getItem('uname');
  }

}
