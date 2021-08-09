import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginTables } from '../Models/user/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  logins:LoginTables[]=[];

  constructor(private http:HttpClient) { }

  req:string="https://localhost:44363/api/LoginTables"

  GetAllLogins():Observable<LoginTables[]>{
    return this.http.get<LoginTables[]>(this.req,
      {
        headers:new HttpHeaders({
        'Content-Type':'text/plain;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        })
      }
    );
  }

  login(username:string,pass:string,admin:string):string{
    // console.log(username + " " + pass + " " + admin);
    for(let l of this.logins){
      console.log(this.logins)
      // console.log(l.uname + " " + l.upassword + " " + l.uadmin);
      if(l.uname==username && l.upassword==pass && l.uadmin==admin){
        console.log("logged in");
        return l.uadmin;
      }
    }
    return "invalid";
  }
  
}
