import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Palpite } from '../models/palpite';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PalpiteService {

  url = environment + 'palpites'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }


// Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  getPalpite(): Observable<Palpite[]> {
    return this.httpClient.get<Palpite[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getPalpiteById(id: number): Observable<Palpite> {
    return this.httpClient.get<Palpite>(this.url + '/' + id)
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