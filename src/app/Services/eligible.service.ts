import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EligibleTables } from '../Models/user/eligible';

@Injectable({
  providedIn: 'root'
})
export class EligibleService {

  constructor(private http:HttpClient) { }
  
  //Variable to store the request URL for accessing API.
  req:string="https://localhost:44363/api/EligibilityTables";

  
  //Method to get the list of all players from the API.
  getAllEligibleTables():Observable<EligibleTables[]>
  {
    return this.http.get<EligibleTables[]>(this.req);
  }

  getEligibleTablesById(eligId:number):Observable<EligibleTables>
  {
    return this.http.get<EligibleTables>(this.req + "/"+ eligId);
  }

  //Method  to create a new player.
  createUser(user:EligibleTables):Observable<EligibleTables>
  {
    console.log(user);
    return this.http.post<EligibleTables>("https://localhost:44363/api/EligibilityTables/EligibilityCheck",user,{
      headers:new HttpHeaders({
        'Content-Type':'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Method':'*'
        
      })
    });
  }

  //Method to update an existing player.
  updateUser(id:number,user:EligibleTables):Observable<any>
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
    return this.http.get<any>('https://localhost:44363/api/EligibleTables').pipe(catchError(this.manageError));
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
