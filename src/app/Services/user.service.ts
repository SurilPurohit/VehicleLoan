import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'
import { UserTables } from '../Models/user/user';


@Injectable({
  providedIn: 'root'
})
export class UserTableservice {

  constructor(private http:HttpClient) { }
  
  //Variable to store the request URL for accessing API.
  req:string="https://localhost:44363/api/UserTables";

  
  //Method to get the list of all players from the API.
  getAllUserTables():Observable<UserTables[]>
  {
    return this.http.get<UserTables[]>(this.req);
  }

  //Method  to create a new player.
  createUser(user:UserTables):Observable<UserTables>
  {
    return this.http.post<UserTables>("https://localhost:44363/api/UserTables/AddUser",user,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }

  //Method to update an existing player.
  updateUser(id:number,user:UserTables):Observable<any>
  {
    
    return this.http.put<any>(this.req+"/"+id,user,{
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
    return this.http.get<any>('https://localhost:44363/api/UserTables').pipe(catchError(this.manageError));
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
