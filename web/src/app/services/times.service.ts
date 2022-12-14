import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Times } from '../models/times';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TimesService {

  url = environment.BASE_URL + 'times'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }


// Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  getTimes(): Observable<Times[]> {
    return this.httpClient.get<Times[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getTimeById(id: number): Observable<Times> {
    return this.httpClient.get<Times>(this.url + `/${id}`)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }


  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      console.log(error)
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}