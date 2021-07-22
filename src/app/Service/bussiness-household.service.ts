import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})


export class BussinessHouseholdService {
  private REST_API_SERVER = 'http://localhost:8080/businesshouse';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      // Authorization: 'my-auth-token'
    })
  };

  constructor(private httpClient: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  public getBussinessHouse(): Observable<any>{
    const url = this.REST_API_SERVER+'/';
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public postBussinessHouse(data): Observable<any>{
    const url = this.REST_API_SERVER+'/';
    return this.httpClient
    .post<any>(url, data ,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
}
