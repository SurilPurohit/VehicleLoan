import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'
import { LoanTables } from '../Models/user/loan';


@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http:HttpClient) { }
  
  //Variable to store the request URL for accessing API.
  req:string="https://localhost:44363/api/LoanTables";

  
  //Method to get the list of all players from the API.
  getAllLoanTables():Observable<LoanTables[]>
  {
    return this.http.get<LoanTables[]>(this.req);
  }

  getLoanTablesById(userid:number):Observable<LoanTables[]>
  {
    console.log(userid);
    return this.http.get<LoanTables[]>(this.req + "/" + userid);
  }

  //Method  to create a new player.
  createUser(user:LoanTables):Observable<LoanTables>
  {
    console.log(user);
    return this.http.post<LoanTables>("https://localhost:44363/api/LoanTables/LoanUser",user,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }

  //Method to update an existing player.
  updateUser(user:LoanTables):Observable<any>
  {
    console.log(user);
    return this.http.put<LoanTables>(this.req,user,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }


  //Method to delete an existing player.
  deleteUser(id:number):Observable<any>
  {
    return this.http.delete<any>(this.req+"/"+id,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
      })
    });
  }

  //Method to test error handling.
  register():Observable<any>
  {
    //Giving incorrect URL.
    return this.http.get<any>('https://localhost:44363/api/LoanTables').pipe(catchError(this.manageError));
  }
  

  //Method to handle errors.
  private manageError(err_response:HttpErrorResponse)
  {
    if(err_response.error instanceof ErrorEvent)
    console.error('Client Side Error:',err_response.error.message);
    else
    console.error('Server Side Error:',err_response);

    return throwError('There is a little problem while processing your request.Sorry for the inconvenience');
    
  }
}
