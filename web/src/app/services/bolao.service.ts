import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Boloes } from '../models/bolao';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BolaoService {

  url = environment.BASE_URL + 'boloes'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }


// Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  getBolao(): Observable<Boloes[]> {
    return this.httpClient.get<Boloes[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getBolaoById(id: number): Observable<Boloes> {
    return this.httpClient.get<Boloes>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
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
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}