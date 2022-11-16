import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Partidas } from '../models/partidas';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PartidasService {

  url = environment + 'partidas'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }


// Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  getPartidas(): Observable<Partidas[]> {
    return this.httpClient.get<Partidas[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getPartidasById(id: number): Observable<Partidas> {
    return this.httpClient.get<Partidas>(this.url + '/' + id)
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