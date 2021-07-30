import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})


export class BussinessHouseholdService {

  private REST_API_SERVER = 'http://localhost:8081/businesshouse';



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

  public getForm(name, certificationNumber, createdDate, status): Observable<any>{
    const url = this.REST_API_SERVER+'/search/'+status+'/'+name+'&'+certificationNumber+'&'+createdDate+'&'+status;
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getForms(name, certificationNumber, createdDate): Observable<any>{
    const url = this.REST_API_SERVER+'/search/'+name+'&'+certificationNumber+'&'+createdDate;
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getNameBusinessHouseholds(data): Observable<any>{
    const url = this.REST_API_SERVER+'/search_name/'+data;
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }
    
  public getBussinessHouseById(data): Observable<any>{
    const url = this.REST_API_SERVER+'/id/'+data;
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }


  public getCertificationNumber(data): Observable<any>{
    const url = this.REST_API_SERVER+'/search_number/'+data;
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getCreatedDate(data): Observable<any>{
    const url = this.REST_API_SERVER+'/search_date/'+data;
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getStatus(data): Observable<any>{
    const url = this.REST_API_SERVER+'/search_status/'+data;
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getStatistics1(dataGT,dataLT,name,address,status): Observable<any>{
    const url = this.REST_API_SERVER+'/statistic1/'+dataGT+'&'+dataLT+'&'+name+'&'+address+'&'+status;
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getStatistics2(month,year,name,position,status): Observable<any>{
    const url = this.REST_API_SERVER+'/statistic2/'+month+'&'+year+'&'+name+'&'+position+'&'+status;
    return this.httpClient
    .get<any>(url,this.httpOptions)
    .pipe(catchError(this.handleError));
  }


  public putBussinessHouse(data,id): Observable<any>{
    const url = this.REST_API_SERVER+'/'+id;
    return this.httpClient
    .put<any>(url, data ,this.httpOptions)
    .pipe(catchError(this.handleError));
  }

}
